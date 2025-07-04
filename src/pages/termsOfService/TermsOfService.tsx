import DropDown from "../../components/DropDown"

const TermsOfService = () => {
  const terms = [
    {
      title: "Introduction",
      description:
        "Ces conditions régissent l’accès et l’utilisation de notre site e-commerce basé en Algérie. En utilisant notre site, vous acceptez ces conditions dans leur intégralité. Si vous n’êtes pas d’accord, veuillez ne pas utiliser notre plateforme."
    },
    {
      title: "Accès au site",
      description:
        "Nous nous efforçons de maintenir le site accessible, mais nous ne garantissons pas une disponibilité ininterrompue. Nous nous réservons le droit de suspendre, modifier ou interrompre tout ou partie du site à tout moment."
    },
    {
      title: "Produits et prix",
      description:
        "Les produits proposés sont décrits avec la plus grande exactitude possible. Les prix sont indiqués en dinars algériens (DZD) et incluent toutes les taxes applicables, sauf indication contraire."
    },
    {
      title: "Commandes et paiements",
      description:
        "Toute commande implique une obligation de paiement. Le livreur se réserve le droit de refuser une commande en cas de non-paiement, de litige antérieur ou de suspicion de fraude."
    },
    {
      title: "Propriété intellectuelle",
      description:
        "Tout le contenu du site (textes, images, logos) est protégé par les lois sur la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation préalable."
    },
    {
      title: "Loi applicable et juridiction",
      description:
        "Ces conditions sont régies par la loi algérienne. Tout litige sera soumis aux tribunaux compétents d’Algérie."
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

export default TermsOfService
