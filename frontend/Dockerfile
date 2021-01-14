FROM node:13.12.0-alpine
# pull official base image

# set working directory
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

# install app dependencies
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]
