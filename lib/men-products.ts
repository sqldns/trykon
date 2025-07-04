export type MenProduct = {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  category: string
  sizes: string[]
  colors: string[]
  rating: number
  reviews: number
  description?: string
  drop?: boolean // true if it's a new drop
}

export const menProducts: MenProduct[] = [
  {
    id: "trykonteetitan2024",
    name: "Compression Tee",
    price: 2499,
    originalPrice: 2999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Tanks",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    rating: 4.8,
    reviews: 124,
    description: "Engineered for performance, comfort, and style. Designed for Indian athletes who demand the best.",
    drop: true,
  },
  {
    id: "trykondrop2024hoodie",
    name: "Compression Hoodie",
    price: 3499,
    originalPrice: 3999,
    image: "/placeholder.svg?height=400&width=300",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Gray", "Navy"],
    rating: 4.8,
    reviews: 203,
    description: "Combines warmth, flexibility, and a premium look—perfect for both training and recovery.",
    drop: true,
  },
  // Add more products here easily!
] 