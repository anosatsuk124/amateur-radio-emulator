# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.241.1/containers/rust/.devcontainer/base.Dockerfile

# [Choice] Debian OS version (use bullseye on local arm64/Apple Silicon): buster, bullseye
FROM mcr.microsoft.com/vscode/devcontainers/rust:0-bullseye

# [Optional] Uncomment this section to install additional packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

RUN apt-get update && apt-get install -y npm

RUN npm i -g n && n install lts

RUN apt-get purge npm -y && apt-get autoremove --purge -y

RUN npm i -g yarn