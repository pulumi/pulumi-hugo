.PHONY: clean
clean:
	./scripts/clean.sh

.PHONY: ensure
ensure:
	./scripts/ensure.sh

.PHONY: build
build:
	./scripts/build.sh

.PHONY: serve
serve:
	./scripts/serve.sh

.PHONY: serve-all
serve-all:
	./scripts/serve.sh all

.PHONY: ci-pull-request
ci-pull-request: ensure
	./scripts/ci/pull-request.sh

.PHONY: ci-pull-request-closed
ci-pull-request-closed:
	./scripts/ci/pull-request-closed.sh

.PHONY: ci-scheduled
ci-scheduled:
	./scripts/ci/scheduled.sh
