# specify the node base image with your desired version
FROM node:16-alpine

# create a directory to hold the application code inside the image
WORKDIR /app
 
# copy both package.json and package-lock.json
COPY ./dist .

COPY package.json .

# install dependencies
RUN npm install

# expose port 8080
EXPOSE 8080

# run the app
CMD [ "node", "index.js" ]
