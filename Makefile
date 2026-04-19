SHELL := /bin/bash

PKG_VERSION := $(shell node -p "require('./package.json').version")
PKG_TAG := v$(PKG_VERSION)
REMOTE := origin
BRANCH := main

.DEFAULT_GOAL := help

.PHONY: help version push tag tag-delete tag-rename tag-reset tag-push tag-list

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "; printf "Usage: make <target>\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

version: ## Print version from package.json
	@echo $(PKG_VERSION)

push: ## Push main to origin (triggers :latest build)
	git push $(REMOTE) $(BRANCH)

tag: ## Create & push annotated tag matching package.json version
	@if git rev-parse -q --verify "refs/tags/$(PKG_TAG)" >/dev/null; then \
		echo "Error: tag $(PKG_TAG) already exists locally"; exit 1; \
	fi
	@if git ls-remote --tags $(REMOTE) "refs/tags/$(PKG_TAG)" | grep -q .; then \
		echo "Error: tag $(PKG_TAG) already exists on $(REMOTE)"; exit 1; \
	fi
	@echo "Creating tag $(PKG_TAG)"
	git tag -a $(PKG_TAG) -m "Release $(PKG_TAG)"
	git push $(REMOTE) $(PKG_TAG)

tag-delete: ## Delete tag locally & remotely (usage: make tag-delete TAG=vX.Y.Z)
	@if [ -z "$(TAG)" ]; then echo "Error: TAG is required (e.g. make tag-delete TAG=v0.0.2)"; exit 1; fi
	-git tag -d $(TAG)
	-git push $(REMOTE) :refs/tags/$(TAG)

tag-rename: ## Rename tag (usage: make tag-rename OLD=vX.Y.Z NEW=vA.B.C)
	@if [ -z "$(OLD)" ] || [ -z "$(NEW)" ]; then echo "Error: OLD and NEW are required"; exit 1; fi
	@if ! git rev-parse -q --verify "refs/tags/$(OLD)" >/dev/null; then \
		echo "Error: tag $(OLD) does not exist locally"; exit 1; \
	fi
	@if git rev-parse -q --verify "refs/tags/$(NEW)" >/dev/null; then \
		echo "Error: tag $(NEW) already exists locally"; exit 1; \
	fi
	git tag -a $(NEW) $(OLD) -m "Release $(NEW)"
	git tag -d $(OLD)
	-git push $(REMOTE) :refs/tags/$(OLD)
	git push $(REMOTE) $(NEW)

tag-reset: ## Move tag to HEAD & force-push (usage: make tag-reset [TAG=vX.Y.Z])
	$(eval T := $(if $(TAG),$(TAG),$(PKG_TAG)))
	@echo "Resetting tag $(T) to HEAD"
	-git tag -d $(T)
	-git push $(REMOTE) :refs/tags/$(T)
	git tag -a $(T) -m "Release $(T)"
	git push $(REMOTE) $(T)

tag-push: ## Push existing local tag (usage: make tag-push [TAG=vX.Y.Z])
	$(eval T := $(if $(TAG),$(TAG),$(PKG_TAG)))
	@if ! git rev-parse -q --verify "refs/tags/$(T)" >/dev/null; then \
		echo "Error: tag $(T) does not exist locally"; exit 1; \
	fi
	git push $(REMOTE) $(T)

tag-list: ## List local tags sorted by version (descending)
	@git tag --sort=-v:refname
