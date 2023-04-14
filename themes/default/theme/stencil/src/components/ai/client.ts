import {
    GenerateNewOutputAction,
    Response,
    MessageType,
    Language,
    OutputChunkResponse,
    CreateConnectionAction,
    ChatGptModel,
} from "./types";
import { parseCookie } from "../../util/util";

export class PulumiAIClient {
    private socket: WebSocket;

    public MAX_PROMPT_LENGTH = 1024;
    public MAX_PROGRAM_LENGTH = 204800;

    private ajsAnonymousID: string;
    private ajsUserID: string;
    private pulumiUserID: string;

    constructor(
        private url: string,
        private connectionOpenCallback: (event: Event) => void,
        private outputChunkCallback: (content: OutputChunkResponse) => void,
        private outputCompleteCallback: () => void,
        private overMessageLimitCallback: () => void,
        private overCapacityCallback: () => void,
        private errorCallback: (error: string) => void,
        private connectionClosedCallback: (msg: string) => void,
    ) {}

    private onOpen() {
        this.sendCreateConnection();
    }

    private onMessage(event: MessageEvent) {
        const eventData: Response = JSON.parse(event.data);

        switch (eventData.type) {
            case MessageType.CREATE_CONNECTION:
                this.connectionOpenCallback(event);
                break
            case MessageType.OUTPUT_CHUNK:
                this.outputChunkCallback(eventData.data);
                break;
            case MessageType.OUTPUT_COMPLETE:
                this.outputCompleteCallback();
                break;
            case MessageType.OVER_MESSAGE_LIMIT_ERROR:
                this.overMessageLimitCallback();
                break;
            case MessageType.OPENAI_RATE_LIMIT_ERROR:
                this.overCapacityCallback();
                break;
            case MessageType.SERVER_ERROR:
                this.errorCallback(eventData.data.message);
                break;
        }
    }

    private onError(event: ErrorEvent) {
        return this.errorCallback(event.message);
    }

    private onClose(event: CloseEvent) {
        return this.connectionClosedCallback(event.reason);
    }

    private send(data: any) {
        if (this.socket) {
            this.socket.send(JSON.stringify(data));
        }
    }

    public connect() {
        this.socket = new WebSocket(this.url);
        this.socket.addEventListener("open", this.onOpen.bind(this));
        this.socket.addEventListener("message", this.onMessage.bind(this));
        this.socket.addEventListener("error", this.onError.bind(this));
        this.socket.addEventListener("close", this.onClose.bind(this));
    }

    private sendCreateConnection() {
        const cookie = parseCookie();
        this.ajsAnonymousID = cookie["ajs_anonymous_id"];
        this.ajsUserID = cookie["ajs_user_id"];

        const message: CreateConnectionAction = {
            type: MessageType.CREATE_CONNECTION,
            data: {
                segmentAnonymousId: this.ajsAnonymousID,
                pulumiUserId: this.pulumiUserID || this.ajsUserID,
            },
        };

        this.send(message);
    }

    public set userID(id: string) {
        this.pulumiUserID = id;

        // If the socket we have isn't ready yet, wait a bit and try again.
        if (this.socket && this.socket.readyState !== this.socket.OPEN) {
            setTimeout(() => { this.userID = id; }, 100);
            return;
        }

        this.sendCreateConnection();
    }

    public disconnect() {
        this.socket.close();
    }

    public submit(language: Language, program: string, instructions: string, version: number, model: ChatGptModel) {
        const args: GenerateNewOutputAction = {
            type: MessageType.GENERATE_NEW_OUTPUT,
            data: {
                language,
                program: program.substring(0, this.MAX_PROGRAM_LENGTH),
                instructions: instructions.substring(0, this.MAX_PROMPT_LENGTH),
                version,
                model,
            },
        };

        this.send(args);
    }
}
