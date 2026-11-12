# Port exposé sur le serveur : change-le ici, ou lance `make PORT=9000`
PORT ?= 3000
NAME := maabio

# `docker compose` (plugin) ou `docker-compose` (ancienne version), selon ce qui est installé
COMPOSE := $(shell docker compose version >/dev/null 2>&1 && echo "docker compose" || echo "docker-compose")

export PORT

.DEFAULT_GOAL := all
.PHONY: all clean build up down logs deploy

# `make` tout seul : détruit tout, reconstruit de zéro, relance (comme si c'était la 1re fois)
all: clean build up

# Détruit le conteneur, son image et les restes
clean:
	-$(COMPOSE) down --rmi all --volumes --remove-orphans
	-docker rm -f $(NAME)
	-docker image prune -f

# Rebuild sans aucun cache, en retéléchargeant les images de base
build:
	$(COMPOSE) build --no-cache --pull

up:
	$(COMPOSE) up -d --force-recreate
	@echo "→ http://localhost:$(PORT)"

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f

# Depuis ton Mac : envoie le projet et refait tout sur le serveur
#   make deploy HOST=user@IP_DU_SERVEUR
HOST ?=
deploy:
	@test -n "$(HOST)" || (echo "usage : make deploy HOST=user@serveur"; exit 1)
	rsync -av --exclude node_modules --exclude dist --exclude files --exclude .git ./ $(HOST):~/maabio/
	ssh $(HOST) 'cd ~/maabio && make'