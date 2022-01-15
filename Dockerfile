FROM ubuntu:18.04

ENV GO_VERSION=1.16.13
ENV HUGO_VERSION=0.82.0
ENV NVM_VERSION=0.39.1
ENV NODE_VERSION=14.16.0
ENV YARN_VERSION=1.22.7

RUN apt-get update && \
    apt-get install -y curl make git && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh | bash && \
    curl -OL https://golang.org/dl/go${GO_VERSION}.linux-amd64.tar.gz && \
    tar -C /usr/local -xvf go${GO_VERSION}.linux-amd64.tar.gz && \
    curl -OL https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    tar -C /usr/local/bin -xvf hugo_${HUGO_VERSION}_Linux-64bit.tar.gz

ENV PATH="/usr/local/go/bin:${PATH}"

ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
RUN npm install -g yarn@1.22

WORKDIR /pulumi-hugo

COPY Makefile package.json yarn.lock .nvmrc go.mod go.sum ./
