const products = [
  {
    id: 1,
    title: "Velvet Bloom",
    description:
      "A delicate floral blend with notes of jasmine, peony, and white musk for a soft and sensual finish.",
    price: 6900,
    images: ["parfum1.webp"],
    type: "women"
  },
  {
    id: 2,
    title: "Midnight Ember",
    description:
      "A bold, smoky scent featuring oud, amber, and black pepper, perfect for evening wear.",
    price: 8450,
    images: ["parfum2.webp"],
    type: "men"
  },
  {
    id: 3,
    title: "Aurora Mist",
    description:
      "Fresh and airy with hints of green apple, freesia, and aquatic notes — light yet captivating.",
    price: 5900,
    images: ["parfum3.webp"],
    type: "women"
  },
  {
    id: 4,
    title: "Iron Woods",
    description:
      "Woody and aromatic, with vetiver, cedarwood, and bergamot delivering a clean masculine profile.",
    price: 7525,
    images: ["parfum4.webp"],
    type: "men"
  },
  {
    id: 5,
    title: "Golden Fleur",
    description:
      "Elegant and radiant with a blend of rose, mandarin, and soft vanilla for a luxurious finish.",
    price: 9200,
    images: ["parfum5.webp"],
    type: "women"
  },
  {
    id: 6,
    title: "Storm Noir",
    description:
      "Dark and intense with hints of leather, tobacco, and spicy cinnamon — unapologetically masculine.",
    price: 8890,
    images: ["parfum6.webp"],
    type: "men"
  },
  {
    id: 7,
    title: "Luna Petals",
    description:
      "A graceful harmony of iris, violet, and sandalwood for a soft and powdery signature.",
    price: 6630,
    images: ["parfum7.webp"],
    type: "women"
  },
  {
    id: 8,
    title: "Cobalt Rush",
    description:
      "Vibrant and energetic with grapefruit, sage, and marine accords — modern and fresh.",
    price: 7145,
    images: ["parfum8.webp"],
    type: "men"
  }
]

const getProducts = () => {
  return products
}

const getProduct = (id: number) => {
  return products.find((product) => product.id === id)
}

export { getProduct, getProducts }
