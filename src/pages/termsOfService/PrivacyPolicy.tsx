import DropDown from "../../components/DropDown"

const PrivacyPolicy = () => {
  const terms = [
    {
      title: "Collecte des données",
      description:
        "Nous collectons les informations que vous nous fournissez lors de la création de votre commande : nom, adresse, numéro de téléphone."
    },
    {
      title: "Utilisation des données",
      description:
        "Vos données sont utilisées uniquement pour le traitement des commandes, la livraison, le service client et, si vous y consentez, l’envoi d’offres promotionnelles."
    },
    {
      title: "Sécurité des données",
      description:
        "Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou divulgation."
    },
    {
      title: "Partage des données",
      description:
        "Vos informations ne sont jamais vendues. Elles peuvent être partagées uniquement avec nos partenaires logistiques (société de livraison), strictement pour exécuter votre commande."
    },
    {
      title: "Droits des utilisateurs",
      description:
        "Vous disposez d’un droit d’accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez-nous à lakhalzineddine12@gmail.com."
    },
    {
      title: "Cookies",
      description:
        "Notre site utilise des cookies pour améliorer l’expérience utilisateur et analyser le trafic. Vous pouvez configurer votre navigateur pour refuser les cookies."
    },
    {
      title: "Modifications",
      description:
        "Nous nous réservons le droit de modifier cette politique de confidentialité. La version en vigueur sera toujours disponible sur cette page."
    }
  ]

  return (
    <div className="flex flex-col gap-4 px-8 py-6 max-w-3xl mx-auto min-h-screen">
      <h3 className="text-xl sm:text-2xl font-semibold my-8">
        Politique de Confidentialité ( Privacy Policy ) :
      </h3>
      {terms.map((term, index) => (
        <DropDown
          key={index}
          title={term.title}
          description={term.description}
        />
      ))}
    </div>
  )
}

export default PrivacyPolicy
