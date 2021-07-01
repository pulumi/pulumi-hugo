import { Component, Host, h, Prop, State } from "@stencil/core";

interface CountdownData {
    distance: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

@Component({
    tag: "pulumi-date-countdown",
    styleUrl: "date-countdown.css",
    shadow: false
})
export class DateCountdown {
    @Prop()
    dateString: string;

    @Prop()
    textClass = "";

    @Prop()
    valueLabelClass = "";

    @Prop()
    countdownOverText = "";

    @State()
    countdownData: CountdownData;

    componentWillLoad() {
        const countdownEndDate = new Date(this.dateString).getTime();
        this.generateCountdownData(countdownEndDate)
        setInterval(() => this.generateCountdownData(countdownEndDate), 1000);
    }

    private generateCountdownData(end: number) {
        const now = Date.now();
        const distance = end - now;
        this.countdownData = {
            distance,
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
        }
    }

    private renderValueLabel(label: string) {
        return <span class={this.valueLabelClass}>{ label }</span>
    }

    private renderCountdown() {
        const { days, hours, minutes, seconds, distance } = this.countdownData;
        return <p class={this.textClass}>
            { distance > 0 ?
                <span>
                    <span>{ days }{this.renderValueLabel("days")} </span>
                    <span>{ hours }{this.renderValueLabel("hours")} </span>
                    <span>{ minutes }{this.renderValueLabel("minutes")} </span>
                    <span>{ seconds }{this.renderValueLabel("seconds")}</span>
                </span>
            :
                this.countdownOverText
            }
        </p>;
    }

    render() {
        return (
            <Host>
                { this.countdownData && this.renderCountdown() }
            </Host>
        );
    }
}
