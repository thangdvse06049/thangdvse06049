# Zip the folder
echo "Zipping..."
zip -r -qq deployment-beta-web.zip . -x '*.git*' '*node_modules*' '*build*' '*dist*' '*deployment-beta-web.zip*'

# Upload the zip
echo "Uploading zip..."
scp -q -o LogLevel=QUIET deployment-beta-web.zip ubuntu@15.236.89.46:~/

# Unzip the folder
echo "Unzipping on remote server..."
ssh ubuntu@15.236.89.46 'rm -rf deployment-beta-web && mkdir deployment-beta-web && unzip -o -qq deployment-beta-web.zip -d deployment-beta-web && rm deployment-beta-web.zip'

# Install NPM packages && build
echo "Installing NPM packages..."
ssh ubuntu@15.236.89.46 '. ~/.nvm/nvm.sh ; cd deployment-beta-web && npm ci'

# Building production deployment
echo "Building production deployment..."
ssh ubuntu@15.236.89.46 '. ~/.nvm/nvm.sh ; cd deployment-beta-web && npm run build'

# Done
echo "Deployment done"