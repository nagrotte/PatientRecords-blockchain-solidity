# Use an official Solidity image as the base image
FROM ethereum/solc:0.8.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy Solidity contracts from the local directory to the container
COPY ./contracts /usr/src/app/contracts




