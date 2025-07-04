import DropDown from "../../components/DropDown"

const ShippingPolicy = () => {
  const terms = [
    {
      title: "Zones desservies",
      description:
        "Nous livrons dans toute l’Algérie, à l’adresse que vous aurez indiquée lors de la commande."
    },
    {
      title: "Délais de livraison",
      description:
        "Les délais de livraison varient généralement de 6 heures à 2 jours ouvrables selon la destination. Ces délais sont donnés à titre indicatif et peuvent être prolongés en cas de force majeure."
    },
    {
      title: "Frais de livraison",
      description:
        "Une fois expédiée, vous recevrez un email ou SMS avec les informations de suivi de votre colis si le service le permet."
    },
    {
      title: "Retards et problèmes de livraison",
      description:
        "En cas de retard ou de problème, merci de nous contacter rapidement. Nous ferons notre possible pour résoudre la situation."
    },
    {
      title: "Colis endommagé",
      description:
        "Si le colis est endommagé à la réception, vous devez le signaler immédiatement au livreur et nous contacter sous 24 heures avec des photos pour que nous puissions traiter la situation."
    }
  ]

  return (
    <div className="flex flex-col gap-4 px-8 py-6 max-w-3xl mx-auto min-h-screen">
      <h3 className="text-xl sm:text-2xl font-semibold my-8">
        Conditions Générales d'Utilisation ( Terms of Service ) :
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

export default ShippingPolicy
