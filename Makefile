
default: ensure build serve

.PHONY: clean
clean:
	./scripts/clean.sh

.PHONY: ensure
ensure:
	./scripts/ensure.sh

.PHONY: lint
lint:
	./scripts/lint.sh

.PHONY: format
format:
	yarn prettier --write .

.PHONY: build
build:
	./scripts/build.sh

.PHONY: ci-build-full-site
ci-build-full-site:
	./scripts/ci/build-full-site.sh

.PHONY: serve
serve:
	./scripts/serve.sh

.PHONY: serve-assets
serve-assets:
	yarn --cwd ./themes/default/theme run start

.PHONY: serve-all
serve-all:
	./node_modules/.bin/concurrently --kill-others -r "./scripts/serve.sh" "yarn --cwd ./themes/default/theme run start"

.PHONY: build-assets
build-assets:
	yarn --cwd ./themes/default/theme run build

.PHONY: ci-pull-request
ci-pull-request: ensure lint
	./scripts/ci/pull-request.sh

.PHONY: ci-pull-request-closed
ci-pull-request-closed:
	./scripts/ci/pull-request-closed.sh

.PHONY: ci-scheduled
ci-scheduled:
	./scripts/ci/scheduled.sh

.PHONY: new-blog-post
new-blog-post:
	hugo new --kind blog-post --contentDir themes/default/content \
	"blog/$(shell bash -c 'read -p "Slug (e.g., 'my-new-post'): " slug; echo $$slug')"

.PHONY: new-learn-module
new-learn-module:
	./scripts/content/new-learn-module.sh

.PHONY: new-learn-topic
new-learn-topic:
	./scripts/content/new-learn-topic.sh

.PHONY: new-template
new-template:
	./scripts/content/new-template.sh
