echo "Bienvenu dans le script de configuration de l'application"
# Configure application
cd ./app
npm install

echo "Voulez-vous vous connecter à expo? (Y / N)"
read response
if [ $response == "y" ]; then
    npx expo login
fi
cd ../

# Configuration de l'API
cd ./api
echo "Configuration de l'API"
cp .env.example .env
npm install
npm run build

cd ../
echo "Configuration terminée"
echo "Lancer l'api avec la commande 'npm run start:api'"
echo "Lancer l'application avec la commande 'npm run start:app'"
