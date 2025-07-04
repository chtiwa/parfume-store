import DropDown from "../../components/DropDown"

const ReturnRefund = () => {
  const terms = [
    {
      title: "Délai de retour",
      description:
        "Vous disposez de 3 jours calendaires à compter de la réception du produit pour demander un retour si vous avez recever le faux parfum ( fausse commande ) ou de la casse de produit lors de la livraison."
    },
    {
      title: "Conditions de retour",
      description:
        "Les articles doivent être retournés neufs, non utilisés, dans leur emballage d’origine avec tous les accessoires et étiquettes. Les produits endommagés ou incomplets ne seront ni repris ni remboursés."
    },
    {
      title: "Procédure de retour",
      description:
        "Contactez notre service client à 0777125891 ou lakhalzineddine12@gmail.com pour initier la procédure. Aucun retour ne sera accepté sans autorisation préalable."
    },
    {
      title: "Frais de retour",
      description:
        "Sauf erreur de notre part ou produit défectueux, les frais de retour sont à la charge du client."
    },
    {
      title: "Remboursement",
      description:
        "Après réception et inspection des articles retournés, nous traiterons le remboursement dans un délai de 14 jours ouvrables, via le même moyen de paiement que celui utilisé lors de l’achat."
    }
  ]

  return (
    <div className="flex flex-col gap-4 px-8 py-6 max-w-3xl mx-auto min-h-screen">
      <h3 className="text-xl sm:text-2xl font-semibold my-8">
        Politique de Retour et Remboursement ( Return & Refund Policy ) :
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

export default ReturnRefund
