clean:
	./scripts/clean.sh

ensure:
	./scripts/ensure.sh

build:
	./scripts/build.sh

serve:
	./scripts/serve.sh

serve-all:
	./scripts/serve.sh all

ci-pull-request: ensure
	./scripts/ci/pull-request.sh

ci-pull-request-closed:
	./scripts/ci/pull-request-closed.sh
