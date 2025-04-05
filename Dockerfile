FROM node:18-alpine

RUN apk add --no-cache \
    bash \
    curl \
    git \
    python3 \
    make \
    g++ \
    libc6-compat \
    yarn

WORKDIR '/react_dev_interview_march_2025'

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3006

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then yarn build && yarn global add serve && exec serve -s dist -l 3006; else exec yarn dev --host --port 3006; fi"]
