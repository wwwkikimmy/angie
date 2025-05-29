"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useChat } from "ai/react"
import {
  Briefcase,
  Calendar,
  Home,
  ShoppingBag,
  Wrench,
  Search,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  Phone,
  AlertCircle,
  Trash2,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Heart,
  Coffee,
  GraduationCap,
  TestTube,
} from "lucide-react"

export default function KingstonDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [formData, setFormData] = useState({})
  const [showChat, setShowChat] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Test Groq connection
  const testConnection = async () => {
    try {
      setTestResult("Testing...")
      const response = await fetch("/api/test-groq")
      const data = await response.json()

      if (data.success) {
        setTestResult(`✅ Connection successful! Response: "${data.response}"`)
      } else {
        setTestResult(`❌ Connection failed: ${data.error}`)
      }
    } catch (error) {
      setTestResult(`❌ Test failed: ${error.message}`)
    }
  }

  // Use the AI SDK's useChat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! My name is Angie, and I will be your personal assistant to settle in Kingston! 👋 I'm here to help you find the perfect job, housing, social events, and answer any questions about living in Kingston as a young professional. What would you like to explore first?",
      },
    ],
    onError: (error) => {
      console.error("Chat error details:", error)
      console.error("Error type:", typeof error)
      console.error("Error string:", String(error))

      // Add a fallback response for common questions
      const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""

      if (lastUserMessage.includes("coffee") || lastUserMessage.includes("cafe")) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "I'm having trouble connecting to my AI service right now, but I can still help! For great coffee shops in Kingston:\n\n☕ **Sleepless Goat Café** - Popular with students and professionals, great WiFi\n☕ **Novel Idea Bookstore & Café** - Quiet atmosphere, perfect for focused work\n☕ **Balzac's Coffee** - Multiple locations, reliable internet\n☕ **Tim Hortons locations downtown** - Always reliable for quick work sessions\n\nMost cafés in the downtown core and near Queen's University are remote-work friendly. Would you like specific addresses or more details about any of these?",
          },
        ])
      } else if (lastUserMessage.includes("housing") || lastUserMessage.includes("rent")) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "I'm having connection issues, but here's some quick housing info for Kingston:\n\n🏠 **Popular areas for young professionals:**\n• Downtown/Princess Street - walkable, nightlife\n• University District - affordable, transit access\n• Waterfront areas - scenic, quieter\n• Sydenham Ward - good value, growing area\n\n💰 **Typical rent ranges:**\n• Bachelor/Studio: $900-1,200\n• 1BR: $1,200-1,600\n• 2BR: $1,500-2,000\n• Shared housing: $600-900\n\nCheck the Housing tab above for current listings!",
          },
        ])
      } else {
        // Generic fallback with more helpful message
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "I'm sorry, I'm having trouble connecting to my AI service right now. This might be a temporary issue. Please try again in a moment, or feel free to browse the different sections of the dashboard for jobs, housing, events, and more information about Kingston!\n\nYou can also try using the 'Test Groq Connection' button above to check if the service is working.",
          },
        ])
      }
    },
  })

  // Initialize with Angie's welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hi! My name is Angie, and I will be your personal assistant to settle in Kingston! 👋 I'm here to help you find the perfect job, housing, social events, and answer any questions about living in Kingston as a young professional. What would you like to explore first?",
        },
      ])
    }
  }, [messages.length, setMessages])

  const [jobListings, setJobListings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kingston-jobs")
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              title: "Software Developer",
              company: "Kingston Tech Solutions",
              location: "Downtown Kingston",
              salary: "$65,000 - $80,000",
              type: "Full-time",
              posted: "2 days ago",
              remote: true,
            },
            {
              id: 2,
              title: "Marketing Coordinator",
              company: "Queen's University",
              location: "University District",
              salary: "$45,000 - $55,000",
              type: "Full-time",
              posted: "1 week ago",
              remote: false,
            },
            {
              id: 3,
              title: "UX Designer",
              company: "Local Startup",
              location: "Princess Street",
              salary: "$55,000 - $70,000",
              type: "Full-time",
              posted: "3 days ago",
              remote: true,
            },
            {
              id: 4,
              title: "Data Analyst",
              company: "Kingston Health Sciences Centre",
              location: "Stuart Street",
              salary: "$50,000 - $65,000",
              type: "Full-time",
              posted: "1 day ago",
              remote: false,
            },
            {
              id: 5,
              title: "Frontend Developer",
              company: "Limestone Digital",
              location: "Princess Street",
              salary: "$60,000 - $75,000",
              type: "Full-time",
              posted: "4 days ago",
              remote: true,
            },
            {
              id: 6,
              title: "Project Manager",
              company: "City of Kingston",
              location: "City Hall",
              salary: "$70,000 - $85,000",
              type: "Full-time",
              posted: "5 days ago",
              remote: false,
            },
            {
              id: 7,
              title: "Content Writer",
              company: "Kingston Tourism",
              location: "Downtown Kingston",
              salary: "$40,000 - $50,000",
              type: "Full-time",
              posted: "3 days ago",
              remote: true,
            },
            {
              id: 8,
              title: "Business Analyst",
              company: "Utilities Kingston",
              location: "John Counter Blvd",
              salary: "$55,000 - $70,000",
              type: "Full-time",
              posted: "1 week ago",
              remote: false,
            },
            {
              id: 9,
              title: "Graphic Designer",
              company: "Creative Kingston Agency",
              location: "Bagot Street",
              salary: "$45,000 - $55,000",
              type: "Full-time",
              posted: "2 days ago",
              remote: true,
            },
            {
              id: 10,
              title: "Research Assistant",
              company: "Queen's University",
              location: "University District",
              salary: "$35,000 - $45,000",
              type: "Part-time",
              posted: "6 days ago",
              remote: false,
            },
            {
              id: 11,
              title: "Sales Representative",
              company: "Kingston Hyundai",
              location: "Bath Road",
              salary: "$45,000 - $65,000",
              type: "Full-time",
              posted: "1 week ago",
              remote: false,
            },
            {
              id: 12,
              title: "Social Media Manager",
              company: "Local Restaurant Group",
              location: "Princess Street",
              salary: "$40,000 - $50,000",
              type: "Full-time",
              posted: "3 days ago",
              remote: true,
            },
            {
              id: 13,
              title: "DevOps Engineer",
              company: "Kingston FinTech",
              location: "Innovation Park",
              salary: "$75,000 - $90,000",
              type: "Full-time",
              posted: "2 days ago",
              remote: true,
            },
            {
              id: 14,
              title: "HR Coordinator",
              company: "Providence Care",
              location: "King Street West",
              salary: "$45,000 - $55,000",
              type: "Full-time",
              posted: "4 days ago",
              remote: false,
            },
            {
              id: 15,
              title: "Mobile App Developer",
              company: "Kingston Startup Hub",
              location: "Downtown Kingston",
              salary: "$65,000 - $80,000",
              type: "Contract",
              posted: "1 day ago",
              remote: true,
            },
          ]
    }
    return []
  })

  const [events, setEvents] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kingston-events")
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              title: "Young Professionals Networking",
              date: "Dec 20, 2024",
              time: "6:00 PM - 9:00 PM",
              location: "The Mansion",
              category: "Networking",
              attendees: 45,
              ageGroup: "25-35",
            },
            {
              id: 2,
              title: "Tech Meetup Kingston",
              date: "Dec 22, 2024",
              time: "7:00 PM",
              location: "Innovation Park",
              category: "Tech",
              attendees: 30,
              ageGroup: "22-40",
            },
            {
              id: 3,
              title: "Coffee & Code",
              date: "Every Wednesday",
              time: "8:00 AM - 10:00 AM",
              location: "Sleepless Goat Café",
              category: "Coworking",
              attendees: 15,
              ageGroup: "20-35",
            },
            {
              id: 4,
              title: "Kingston Trivia Night",
              date: "Dec 18, 2024",
              time: "7:30 PM - 10:00 PM",
              location: "The Ale House",
              category: "Social",
              attendees: 60,
              ageGroup: "21-35",
            },
            {
              id: 5,
              title: "Winter Market & Social",
              date: "Dec 21, 2024",
              time: "10:00 AM - 4:00 PM",
              location: "Market Square",
              category: "Community",
              attendees: 120,
              ageGroup: "All ages",
            },
            {
              id: 6,
              title: "Startup Pitch Night",
              date: "Dec 19, 2024",
              time: "6:30 PM - 9:30 PM",
              location: "Queen's Innovation Centre",
              category: "Business",
              attendees: 40,
              ageGroup: "22-40",
            },
            {
              id: 7,
              title: "Book Club: Young Professionals",
              date: "Dec 23, 2024",
              time: "7:00 PM - 8:30 PM",
              location: "Novel Idea Bookstore",
              category: "Culture",
              attendees: 18,
              ageGroup: "25-40",
            },
            {
              id: 8,
              title: "Kingston Photography Walk",
              date: "Dec 24, 2024",
              time: "2:00 PM - 5:00 PM",
              location: "Downtown Kingston",
              category: "Arts",
              attendees: 25,
              ageGroup: "20-45",
            },
            {
              id: 9,
              title: "New Year Networking Brunch",
              date: "Jan 2, 2025",
              time: "10:00 AM - 1:00 PM",
              location: "Hotel Belvedere",
              category: "Networking",
              attendees: 80,
              ageGroup: "25-40",
            },
            {
              id: 10,
              title: "Board Game Night",
              date: "Every Friday",
              time: "7:00 PM - 11:00 PM",
              location: "Nexus Café",
              category: "Social",
              attendees: 20,
              ageGroup: "20-35",
            },
            {
              id: 11,
              title: "Kingston Hiking Group",
              date: "Dec 25, 2024",
              time: "9:00 AM - 3:00 PM",
              location: "Lemoine Point",
              category: "Outdoor",
              attendees: 35,
              ageGroup: "22-45",
            },
            {
              id: 12,
              title: "Wine Tasting & Networking",
              date: "Dec 26, 2024",
              time: "6:00 PM - 9:00 PM",
              location: "Megalomaniac Winery",
              category: "Social",
              attendees: 50,
              ageGroup: "25-40",
            },
          ]
    }
    return []
  })

  const [rentals, setRentals] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kingston-rentals")
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              title: "Modern 1BR Downtown Loft",
              price: "$1,400/month",
              location: "Princess Street",
              bedrooms: 1,
              bathrooms: 1,
              available: "Jan 1, 2025",
              walkScore: 95,
              nearTransit: true,
            },
            {
              id: 2,
              title: "Shared House Near Queen's",
              price: "$650/month",
              location: "University District",
              bedrooms: 1,
              bathrooms: 1,
              available: "Available Now",
              walkScore: 88,
              nearTransit: true,
            },
            {
              id: 3,
              title: "Cozy Studio with Workspace",
              price: "$1,100/month",
              location: "Sydenham Ward",
              bedrooms: 0,
              bathrooms: 1,
              available: "Feb 1, 2025",
              walkScore: 75,
              nearTransit: false,
            },
            {
              id: 4,
              title: "Spacious 2BR Near Hospital",
              price: "$1,800/month",
              location: "Stuart Street",
              bedrooms: 2,
              bathrooms: 1,
              available: "Jan 15, 2025",
              walkScore: 82,
              nearTransit: true,
            },
            {
              id: 5,
              title: "Bachelor Apartment Downtown",
              price: "$950/month",
              location: "Brock Street",
              bedrooms: 0,
              bathrooms: 1,
              available: "Available Now",
              walkScore: 92,
              nearTransit: true,
            },
            {
              id: 6,
              title: "Room in Professional House",
              price: "$700/month",
              location: "Johnson Street",
              bedrooms: 1,
              bathrooms: 1,
              available: "Dec 20, 2024",
              walkScore: 85,
              nearTransit: true,
            },
            {
              id: 7,
              title: "Luxury 1BR with Parking",
              price: "$1,600/month",
              location: "King Street East",
              bedrooms: 1,
              bathrooms: 1,
              available: "Feb 1, 2025",
              walkScore: 78,
              nearTransit: false,
            },
            {
              id: 8,
              title: "Student-Friendly 3BR House",
              price: "$2,200/month",
              location: "University District",
              bedrooms: 3,
              bathrooms: 2,
              available: "May 1, 2025",
              walkScore: 90,
              nearTransit: true,
            },
            {
              id: 9,
              title: "Waterfront Condo",
              price: "$2,000/month",
              location: "Lake Ontario Park",
              bedrooms: 2,
              bathrooms: 2,
              available: "Jan 1, 2025",
              walkScore: 65,
              nearTransit: false,
            },
            {
              id: 10,
              title: "Basement Apartment",
              price: "$800/month",
              location: "Division Street",
              bedrooms: 1,
              bathrooms: 1,
              available: "Available Now",
              walkScore: 70,
              nearTransit: true,
            },
            {
              id: 11,
              title: "Heritage Building Loft",
              price: "$1,500/month",
              location: "Princess Street",
              bedrooms: 1,
              bathrooms: 1,
              available: "Jan 15, 2025",
              walkScore: 96,
              nearTransit: true,
            },
            {
              id: 12,
              title: "Pet-Friendly 2BR",
              price: "$1,700/month",
              location: "Cataraqui Woods",
              bedrooms: 2,
              bathrooms: 1,
              available: "Feb 15, 2025",
              walkScore: 60,
              nearTransit: false,
            },
          ]
    }
    return []
  })

  const [marketplace, setMarketplace] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kingston-marketplace")
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              title: "MacBook Pro 2021 - Perfect for Remote Work",
              price: "$1,200",
              seller: "Sarah M.",
              condition: "Excellent",
              posted: "1 day ago",
              category: "Electronics",
            },
            {
              id: 2,
              title: "Bike for Kingston Commuting",
              price: "$300",
              seller: "Mike D.",
              condition: "Good",
              posted: "3 days ago",
              category: "Transportation",
            },
            {
              id: 3,
              title: "IKEA Furniture Set - Moving Sale",
              price: "$450",
              seller: "Emma L.",
              condition: "Like New",
              posted: "1 week ago",
              category: "Furniture",
            },
            {
              id: 4,
              title: "iPhone 14 Pro - Unlocked",
              price: "$800",
              seller: "Alex K.",
              condition: "Excellent",
              posted: "2 days ago",
              category: "Electronics",
            },
            {
              id: 5,
              title: "Winter Coat - Canada Goose",
              price: "$200",
              seller: "Jessica R.",
              condition: "Good",
              posted: "4 days ago",
              category: "Clothing",
            },
            {
              id: 6,
              title: "Gaming Setup - Monitor & Keyboard",
              price: "$350",
              seller: "Tyler B.",
              condition: "Like New",
              posted: "1 day ago",
              category: "Electronics",
            },
            {
              id: 7,
              title: "Coffee Table - Solid Wood",
              price: "$120",
              seller: "Maria S.",
              condition: "Good",
              posted: "5 days ago",
              category: "Furniture",
            },
            {
              id: 8,
              title: "Textbooks - Business Program",
              price: "$180",
              seller: "David L.",
              condition: "Good",
              posted: "1 week ago",
              category: "Books",
            },
            {
              id: 9,
              title: "Electric Scooter",
              price: "$400",
              seller: "Rachel P.",
              condition: "Excellent",
              posted: "3 days ago",
              category: "Transportation",
            },
            {
              id: 10,
              title: "Kitchen Appliances Bundle",
              price: "$250",
              seller: "Chris W.",
              condition: "Good",
              posted: "2 days ago",
              category: "Appliances",
            },
            {
              id: 11,
              title: "Gym Equipment Set",
              price: "$300",
              seller: "Amanda T.",
              condition: "Like New",
              posted: "6 days ago",
              category: "Sports",
            },
            {
              id: 12,
              title: "Professional Camera - Canon",
              price: "$600",
              seller: "Jordan M.",
              condition: "Excellent",
              posted: "1 day ago",
              category: "Electronics",
            },
          ]
    }
    return []
  })

  const [services, setServices] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kingston-services")
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              name: "Kingston Moving Pros",
              category: "Moving",
              rating: 4.8,
              reviews: 127,
              phone: "(613) 555-0123",
              description: "Helping young professionals relocate to Kingston",
              youngProfessionalFriendly: true,
            },
            {
              id: 2,
              name: "Clean Start Cleaning",
              category: "Cleaning",
              rating: 4.9,
              reviews: 89,
              phone: "(613) 555-0456",
              description: "Affordable cleaning for busy professionals",
              youngProfessionalFriendly: true,
            },
            {
              id: 3,
              name: "Tech Setup Kingston",
              category: "Tech Support",
              rating: 4.7,
              reviews: 156,
              phone: "(613) 555-0789",
              description: "Home office and tech setup for remote workers",
              youngProfessionalFriendly: true,
            },
            {
              id: 4,
              name: "Kingston Handyman Services",
              category: "Home Repair",
              rating: 4.6,
              reviews: 203,
              phone: "(613) 555-0234",
              description: "Quick fixes and installations for renters",
              youngProfessionalFriendly: true,
            },
            {
              id: 5,
              name: "Fresh Meal Prep Kingston",
              category: "Food Service",
              rating: 4.8,
              reviews: 95,
              phone: "(613) 555-0567",
              description: "Healthy meal prep for busy professionals",
              youngProfessionalFriendly: true,
            },
            {
              id: 6,
              name: "Kingston Pet Care",
              category: "Pet Services",
              rating: 4.9,
              reviews: 142,
              phone: "(613) 555-0890",
              description: "Dog walking and pet sitting services",
              youngProfessionalFriendly: true,
            },
            {
              id: 7,
              name: "Limestone City Tutoring",
              category: "Education",
              rating: 4.7,
              reviews: 78,
              phone: "(613) 555-0345",
              description: "Professional development and skill training",
              youngProfessionalFriendly: true,
            },
            {
              id: 8,
              name: "Kingston Car Share",
              category: "Transportation",
              rating: 4.5,
              reviews: 167,
              phone: "(613) 555-0678",
              description: "Affordable car sharing for young professionals",
              youngProfessionalFriendly: true,
            },
            {
              id: 9,
              name: "Wellness Kingston",
              category: "Health & Wellness",
              rating: 4.8,
              reviews: 134,
              phone: "(613) 555-0901",
              description: "Massage therapy and wellness services",
              youngProfessionalFriendly: true,
            },
            {
              id: 10,
              name: "Kingston Financial Planning",
              category: "Financial",
              rating: 4.6,
              reviews: 89,
              phone: "(613) 555-0456",
              description: "Financial advice for young professionals",
              youngProfessionalFriendly: true,
            },
          ]
    }
    return []
  })

  const [lostFound, setLostFound] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("kingston-lost-found")
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              type: "Lost",
              item: "AirPods Pro",
              location: "Queen's Campus",
              date: "Dec 10, 2024",
              contact: "jane@email.com",
              description: "Lost during morning jog, reward offered",
            },
            {
              id: 2,
              type: "Found",
              item: "iPhone 14 with Work Badge",
              location: "Downtown Kingston",
              date: "Dec 12, 2024",
              contact: "(613) 555-0321",
              description: "Found near City Hall, has company ID attached",
            },
            {
              id: 3,
              type: "Lost",
              item: "Laptop Bag with Work Documents",
              location: "Kingston Transit Stop",
              date: "Dec 11, 2024",
              contact: "mike@email.com",
              description: "Black messenger bag, contains important work files",
            },
            {
              id: 4,
              type: "Found",
              item: "Silver Watch - Citizen",
              location: "Market Square",
              date: "Dec 13, 2024",
              contact: "(613) 555-0654",
              description: "Found during winter market, engraved initials 'J.M.'",
            },
            {
              id: 5,
              type: "Lost",
              item: "Car Keys - Honda",
              location: "Princess Street",
              date: "Dec 14, 2024",
              contact: "sarah.jones@email.com",
              description: "Black Honda key fob with gym membership tag",
            },
            {
              id: 6,
              type: "Found",
              item: "Prescription Glasses",
              location: "Sleepless Goat Café",
              date: "Dec 9, 2024",
              contact: "(613) 555-0987",
              description: "Black frame glasses left on table, case included",
            },
            {
              id: 7,
              type: "Lost",
              item: "Blue Winter Scarf",
              location: "Queen's University",
              date: "Dec 8, 2024",
              contact: "student@queensu.ca",
              description: "Hand-knitted blue scarf, sentimental value",
            },
            {
              id: 8,
              type: "Found",
              item: "Wallet - Brown Leather",
              location: "Kingston Centre",
              date: "Dec 15, 2024",
              contact: "(613) 555-0432",
              description: "Brown leather wallet found in parking lot",
            },
          ]
    }
    return []
  })

  // Search functionality
  const filteredJobListings = useMemo(() => {
    if (!searchQuery.trim()) return jobListings
    const query = searchQuery.toLowerCase()
    return jobListings.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.salary.toLowerCase().includes(query) ||
        job.type.toLowerCase().includes(query),
    )
  }, [jobListings, searchQuery])

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events
    const query = searchQuery.toLowerCase()
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query) ||
        event.ageGroup.toLowerCase().includes(query),
    )
  }, [events, searchQuery])

  const filteredRentals = useMemo(() => {
    if (!searchQuery.trim()) return rentals
    const query = searchQuery.toLowerCase()
    return rentals.filter(
      (rental) =>
        rental.title.toLowerCase().includes(query) ||
        rental.location.toLowerCase().includes(query) ||
        rental.price.toLowerCase().includes(query) ||
        rental.available.toLowerCase().includes(query),
    )
  }, [rentals, searchQuery])

  const filteredMarketplace = useMemo(() => {
    if (!searchQuery.trim()) return marketplace
    const query = searchQuery.toLowerCase()
    return marketplace.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.seller.toLowerCase().includes(query) ||
        item.condition.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.price.toLowerCase().includes(query),
    )
  }, [marketplace, searchQuery])

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services
    const query = searchQuery.toLowerCase()
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.phone.toLowerCase().includes(query),
    )
  }, [services, searchQuery])

  const filteredLostFound = useMemo(() => {
    if (!searchQuery.trim()) return lostFound
    const query = searchQuery.toLowerCase()
    return lostFound.filter(
      (item) =>
        item.item.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.contact.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query),
    )
  }, [lostFound, searchQuery])

  useEffect(() => {
    localStorage.setItem("kingston-jobs", JSON.stringify(jobListings))
  }, [jobListings])

  useEffect(() => {
    localStorage.setItem("kingston-events", JSON.stringify(events))
  }, [events])

  useEffect(() => {
    localStorage.setItem("kingston-rentals", JSON.stringify(rentals))
  }, [rentals])

  useEffect(() => {
    localStorage.setItem("kingston-marketplace", JSON.stringify(marketplace))
  }, [marketplace])

  useEffect(() => {
    localStorage.setItem("kingston-services", JSON.stringify(services))
  }, [services])

  useEffect(() => {
    localStorage.setItem("kingston-lost-found", JSON.stringify(lostFound))
  }, [lostFound])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handlePostJob = () => {
    setActiveModal("job")
  }

  const handleCreateEvent = () => {
    setActiveModal("event")
  }

  const handleListProperty = () => {
    setActiveModal("rental")
  }

  const handleSellItem = () => {
    setActiveModal("marketplace")
  }

  const handleListService = () => {
    setActiveModal("service")
  }

  const handleReportItem = () => {
    setActiveModal("lost-found")
  }

  const handleCloseModal = () => {
    setActiveModal(null)
    setFormData({})
  }

  const handleSubmitForm = (type: string) => {
    const newId = Date.now()
    const currentDate = new Date().toLocaleDateString()

    switch (type) {
      case "job":
        const newJob = {
          id: newId,
          title: formData.title || "New Job",
          company: formData.company || "Company Name",
          location: formData.location || "Kingston",
          salary: formData.salary || "Competitive",
          type: formData.type || "Full-time",
          posted: "Just now",
          remote: formData.remote || false,
        }
        setJobListings((prev) => [newJob, ...prev])
        break

      case "event":
        const newEvent = {
          id: newId,
          title: formData.title || "New Event",
          date: formData.date || currentDate,
          time: formData.time || "TBD",
          location: formData.location || "Kingston",
          category: formData.category || "General",
          attendees: 0,
          ageGroup: formData.ageGroup || "All ages",
        }
        setEvents((prev) => [newEvent, ...prev])
        break

      case "rental":
        const newRental = {
          id: newId,
          title: formData.title || "New Property",
          price: formData.price || "$0/month",
          location: formData.location || "Kingston",
          bedrooms: Number.parseInt(formData.bedrooms) || 1,
          bathrooms: Number.parseInt(formData.bathrooms) || 1,
          available: formData.available || "Available Now",
          walkScore: formData.walkScore || 70,
          nearTransit: formData.nearTransit || false,
        }
        setRentals((prev) => [newRental, ...prev])
        break

      case "marketplace":
        const newItem = {
          id: newId,
          title: formData.title || "New Item",
          price: formData.price || "$0",
          seller: "You",
          condition: formData.condition || "Good",
          posted: "Just now",
          category: formData.category || "General",
        }
        setMarketplace((prev) => [newItem, ...prev])
        break

      case "service":
        const newService = {
          id: newId,
          name: formData.name || "New Service",
          category: formData.category || "General",
          rating: 5.0,
          reviews: 0,
          phone: formData.phone || "(613) 555-0000",
          description: formData.description || "Service description",
          youngProfessionalFriendly: formData.youngProfessionalFriendly || false,
        }
        setServices((prev) => [newService, ...prev])
        break

      case "lost-found":
        const newLostFound = {
          id: newId,
          type: formData.type || "Lost",
          item: formData.item || "Item",
          location: formData.location || "Kingston",
          date: formData.date || currentDate,
          contact: formData.contact || "contact@email.com",
          description: formData.description || "Item description",
        }
        setLostFound((prev) => [newLostFound, ...prev])
        break
    }

    alert(`${type} submitted and saved successfully!`)
    handleCloseModal()
  }

  const handleDeleteJob = (id: number) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      setJobListings((prev) => prev.filter((job) => job.id !== id))
    }
  }

  const handleDeleteEvent = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((event) => event.id !== id))
    }
  }

  const handleDeleteRental = (id: number) => {
    if (confirm("Are you sure you want to delete this rental listing?")) {
      setRentals((prev) => prev.filter((rental) => rental.id !== id))
    }
  }

  const handleDeleteMarketplaceItem = (id: number) => {
    if (confirm("Are you sure you want to delete this marketplace item?")) {
      setMarketplace((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const handleDeleteService = (id: number) => {
    if (confirm("Are you sure you want to delete this service listing?")) {
      setServices((prev) => prev.filter((service) => service.id !== id))
    }
  }

  const handleDeleteLostFound = (id: number) => {
    if (confirm("Are you sure you want to delete this lost & found item?")) {
      setLostFound((prev) => prev.filter((item) => item.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Angie Background Image */}
      <div
        className="fixed top-20 left-0 w-64 h-64 bg-no-repeat pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/angie-background.jpg')",
          backgroundPosition: "top left",
          backgroundSize: "contain",
        }}
      />

      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40 relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <MapPin className="h-8 w-8 text-blue-600" />
                <Sparkles className="h-4 w-4 text-purple-500 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Kingston Connect
                </h1>
                <p className="text-sm text-gray-600">Your AI assistant Angie for settling in Kingston</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search Kingston..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white/50"
                />
              </div>
              {searchQuery && (
                <div className="text-sm text-gray-600">
                  Searching for: <span className="font-semibold">"{searchQuery}"</span>
                </div>
              )}
              <Button onClick={testConnection} variant="outline" size="sm" className="flex items-center gap-2">
                <TestTube className="h-4 w-4" />
                Test Groq Connection
              </Button>
              <Button
                onClick={() => setShowChat(!showChat)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with Angie
              </Button>
            </div>
          </div>
          {testResult && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
              <strong>Connection Test:</strong> {testResult}
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${showChat ? "mr-96" : ""} relative z-10`}>
          <div className="container mx-auto px-4 py-8">
            {/* Welcome Section */}
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your New Life in Kingston! 🎉</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Designed specifically for young professionals like you. Find your dream job, perfect home, amazing
                social events, and everything you need to thrive in Kingston.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Badge variant="secondary" className="px-4 py-2">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Growing Tech Scene
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Heart className="h-4 w-4 mr-2" />
                  Vibrant Community
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Coffee className="h-4 w-4 mr-2" />
                  Great Coffee Culture
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  University Town
                </Badge>
              </div>
            </div>

            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8 bg-white/50">
                <TabsTrigger
                  value="jobs"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <Briefcase className="h-4 w-4" />
                  Career
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4" />
                  Social
                </TabsTrigger>
                <TabsTrigger
                  value="rentals"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <Home className="h-4 w-4" />
                  Housing
                </TabsTrigger>
                <TabsTrigger
                  value="marketplace"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Buy & Sell
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <Wrench className="h-4 w-4" />
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="lost-found"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                >
                  <AlertCircle className="h-4 w-4" />
                  Lost & Found
                </TabsTrigger>
              </TabsList>

              {/* Job Hunting & Recruitment */}
              <TabsContent value="jobs">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold">Career Opportunities</h2>
                      <p className="text-gray-600">
                        Find your next role in Kingston's growing job market
                        {searchQuery && (
                          <span className="ml-2 text-blue-600">
                            • {filteredJobListings.length} results for "{searchQuery}"
                          </span>
                        )}
                      </p>
                    </div>
                    <Button onClick={handlePostJob} className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Post a Job
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {filteredJobListings.length === 0 && searchQuery ? (
                      <div className="text-center py-8 text-gray-500">
                        No jobs found for "{searchQuery}". Try a different search term.
                      </div>
                    ) : (
                      filteredJobListings.map((job) => (
                        <Card key={job.id} className="hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="text-lg">{job.company}</CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="secondary">{job.type}</Badge>
                                {job.remote && <Badge className="bg-green-100 text-green-800">Remote OK</Badge>}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-gray-500" />
                                {job.salary}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                {job.posted}
                              </div>
                              <Button size="sm" className="w-fit bg-gradient-to-r from-blue-600 to-purple-600">
                                Apply Now
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="w-fit"
                                onClick={() => handleDeleteJob(job.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Local Events */}
              <TabsContent value="events">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold">Social Events</h2>
                      <p className="text-gray-600">
                        Connect with other young professionals in Kingston
                        {searchQuery && (
                          <span className="ml-2 text-blue-600">
                            • {filteredEvents.length} results for "{searchQuery}"
                          </span>
                        )}
                      </p>
                    </div>
                    <Button onClick={handleCreateEvent} className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Create Event
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.length === 0 && searchQuery ? (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        No events found for "{searchQuery}". Try a different search term.
                      </div>
                    ) : (
                      filteredEvents.map((event) => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{event.title}</CardTitle>
                              <Badge className="bg-purple-100 text-purple-800">{event.category}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-gray-500" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              {event.attendees} attending • {event.ageGroup}
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                                Join Event
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteEvent(event.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Rentals */}
              <TabsContent value="rentals">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold">Housing Options</h2>
                      <p className="text-gray-600">
                        Find your perfect home in Kingston
                        {searchQuery && (
                          <span className="ml-2 text-blue-600">
                            • {filteredRentals.length} results for "{searchQuery}"
                          </span>
                        )}
                      </p>
                    </div>
                    <Button onClick={handleListProperty} className="bg-gradient-to-r from-blue-600 to-purple-600">
                      List Property
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredRentals.length === 0 && searchQuery ? (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        No rentals found for "{searchQuery}". Try a different search term.
                      </div>
                    ) : (
                      filteredRentals.map((rental) => (
                        <Card
                          key={rental.id}
                          className="hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm"
                        >
                          <CardHeader>
                            <CardTitle className="text-lg">{rental.title}</CardTitle>
                            <CardDescription className="text-xl font-semibold text-green-600">
                              {rental.price}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              {rental.location}
                            </div>
                            <div className="flex gap-4 text-sm">
                              <span>{rental.bedrooms} bed</span>
                              <span>{rental.bathrooms} bath</span>
                              <span>Walk Score: {rental.walkScore}</span>
                            </div>
                            <div className="flex gap-2">
                              {rental.nearTransit && <Badge className="bg-blue-100 text-blue-800">Near Transit</Badge>}
                              {rental.walkScore > 90 && (
                                <Badge className="bg-green-100 text-green-800">Very Walkable</Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">Available: {rental.available}</div>
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                                Contact Landlord
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteRental(rental.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Marketplace */}
              <TabsContent value="marketplace">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold">Buy & Sell</h2>
                      <p className="text-gray-600">
                        Find great deals from other young professionals
                        {searchQuery && (
                          <span className="ml-2 text-blue-600">
                            • {filteredMarketplace.length} results for "{searchQuery}"
                          </span>
                        )}
                      </p>
                    </div>
                    <Button onClick={handleSellItem} className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Sell Item
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredMarketplace.length === 0 && searchQuery ? (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        No marketplace items found for "{searchQuery}". Try a different search term.
                      </div>
                    ) : (
                      filteredMarketplace.map((item) => (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription className="text-xl font-semibold text-green-600">
                              {item.price}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {item.seller
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{item.seller}</span>
                              <Badge variant="outline">{item.category}</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Condition: {item.condition}</span>
                              <span className="text-gray-500">{item.posted}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                                Message Seller
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteMarketplaceItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Local Services */}
              <TabsContent value="services">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold">Professional Services</h2>
                      <p className="text-gray-600">
                        Services tailored for young professionals
                        {searchQuery && (
                          <span className="ml-2 text-blue-600">
                            • {filteredServices.length} results for "{searchQuery}"
                          </span>
                        )}
                      </p>
                    </div>
                    <Button onClick={handleListService} className="bg-gradient-to-r from-blue-600 to-purple-600">
                      List Service
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {filteredServices.length === 0 && searchQuery ? (
                      <div className="text-center py-8 text-gray-500">
                        No services found for "{searchQuery}". Try a different search term.
                      </div>
                    ) : (
                      filteredServices.map((service) => (
                        <Card
                          key={service.id}
                          className="hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm"
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl">{service.name}</CardTitle>
                                <CardDescription>{service.category}</CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="outline">{service.category}</Badge>
                                {service.youngProfessionalFriendly && (
                                  <Badge className="bg-purple-100 text-purple-800">YP Friendly</Badge>
                                )}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-semibold">{service.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
                              </div>
                              <p className="text-sm text-gray-600">{service.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-gray-500" />
                                  {service.phone}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Phone className="h-4 w-4 mr-1" />
                                    Call
                                  </Button>
                                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                                    Book Service
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteService(service.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Lost and Found */}
              <TabsContent value="lost-found">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold">Lost & Found</h2>
                      <p className="text-gray-600">
                        Help the Kingston community find their belongings
                        {searchQuery && (
                          <span className="ml-2 text-blue-600">
                            • {filteredLostFound.length} results for "{searchQuery}"
                          </span>
                        )}
                      </p>
                    </div>
                    <Button onClick={handleReportItem} className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Report Item
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredLostFound.length === 0 && searchQuery ? (
                      <div className="col-span-full text-center py-8 text-gray-500">
                        No lost & found items found for "{searchQuery}". Try a different search term.
                      </div>
                    ) : (
                      filteredLostFound.map((item) => (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="text-lg">
                              {item.type}: {item.item}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500">
                              Location: {item.location} • Date: {item.date}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-gray-500" />
                              Contact: {item.contact}
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                                Contact Finder
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleDeleteLostFound(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Chat Sidebar */}
        <aside
          className={`bg-white border-l w-96 fixed top-0 right-0 h-full overflow-y-auto p-4 transition-transform duration-300 transform ${
            showChat ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Chat with Angie</h3>
            <Button variant="ghost" size="icon" onClick={() => setShowChat(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </Button>
          </div>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.role === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask Angie anything..."
                value={input}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
            {error && <div className="text-red-500 mt-2 text-sm">Error: {error.message}</div>}
          </form>
        </aside>
      </div>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="max-w-2xl w-full bg-white/90">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {activeModal === "job" && "Post a Job"}
                {activeModal === "event" && "Create Event"}
                {activeModal === "rental" && "List Property"}
                {activeModal === "marketplace" && "Sell Item"}
                {activeModal === "service" && "List Service"}
                {activeModal === "lost-found" && "Report Item"}
              </CardTitle>
              <CardDescription>
                {activeModal === "job" && "Enter the details of the job you want to post."}
                {activeModal === "event" && "Enter the details of the event you want to create."}
                {activeModal === "rental" && "Enter the details of the property you want to list."}
                {activeModal === "marketplace" && "Enter the details of the item you want to sell."}
                {activeModal === "service" && "Enter the details of the service you want to list."}
                {activeModal === "lost-found" && "Enter the details of the item you want to report."}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {activeModal === "job" && (
                <>
                  <div className="grid gap-2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Job Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Software Engineer"
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Company
                    </label>
                    <Input
                      id="company"
                      placeholder="Acme Corp"
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="location"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Location
                    </label>
                    <Input
                      id="location"
                      placeholder="Kingston, ON"
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="salary"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Salary
                    </label>
                    <Input
                      id="salary"
                      placeholder="$60,000 - $80,000"
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Job Type
                    </label>
                    <Input
                      id="type"
                      placeholder="Full-time"
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remote"
                      className="h-4 w-4"
                      onChange={(e) => setFormData({ ...formData, remote: e.target.checked })}
                    />
                    <label
                      htmlFor="remote"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Remote OK
                    </label>
                  </div>
                </>
              )}

              {activeModal === "event" && (
                <>
                  <div className="grid gap-2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Event Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Kingston Tech Meetup"
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Date
                    </label>
                    <Input id="date" type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="time" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Time
                    </label>
                    <Input id="time" type="time" onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="location"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Location
                    </label>
                    <Input
                      id="location"
                      placeholder="Innovation Park"
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Category
                    </label>
                    <Input
                      id="category"
                      placeholder="Tech"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="ageGroup"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Age Group
                    </label>
                    <Input
                      id="ageGroup"
                      placeholder="25-35"
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                    />
                  </div>
                </>
              )}

              {activeModal === "rental" && (
                <>
                  <div className="grid gap-2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Property Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Modern 1BR Apartment"
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="price"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Price
                    </label>
                    <Input
                      id="price"
                      placeholder="$1,500/month"
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="location"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Location
                    </label>
                    <Input
                      id="location"
                      placeholder="Downtown Kingston"
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="bedrooms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Bedrooms
                    </label>
                    <Input
                      id="bedrooms"
                      type="number"
                      placeholder="1"
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="bathrooms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Bathrooms
                    </label>
                    <Input
                      id="bathrooms"
                      type="number"
                      placeholder="1"
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="available"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Available Date
                    </label>
                    <Input
                      id="available"
                      type="date"
                      onChange={(e) => setFormData({ ...formData, available: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="walkScore"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Walk Score
                    </label>
                    <Input
                      id="walkScore"
                      type="number"
                      placeholder="85"
                      onChange={(e) => setFormData({ ...formData, walkScore: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="nearTransit"
                      className="h-4 w-4"
                      onChange={(e) => setFormData({ ...formData, nearTransit: e.target.checked })}
                    />
                    <label
                      htmlFor="nearTransit"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Near Transit
                    </label>
                  </div>
                </>
              )}

              {activeModal === "marketplace" && (
                <>
                  <div className="grid gap-2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Item Title
                    </label>
                    <Input
                      id="title"
                      placeholder="MacBook Pro 2021"
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="price"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Price
                    </label>
                    <Input
                      id="price"
                      placeholder="$1,200"
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="condition"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Condition
                    </label>
                    <Input
                      id="condition"
                      placeholder="Excellent"
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Category
                    </label>
                    <Input
                      id="category"
                      placeholder="Electronics"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                </>
              )}

              {activeModal === "service" && (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Service Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Kingston Moving Pros"
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Category
                    </label>
                    <Input
                      id="category"
                      placeholder="Moving"
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      placeholder="(613) 555-0123"
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Description
                    </label>
                    <Input
                      id="description"
                      placeholder="Helping young professionals relocate to Kingston"
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="youngProfessionalFriendly"
                      className="h-4 w-4"
                      onChange={(e) => setFormData({ ...formData, youngProfessionalFriendly: e.target.checked })}
                    />
                    <label
                      htmlFor="youngProfessionalFriendly"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Young Professional Friendly
                    </label>
                  </div>
                </>
              )}

              {activeModal === "lost-found" && (
                <>
                  <div className="grid gap-2">
                    <label htmlFor="type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Type
                    </label>
                    <select
                      id="type"
                      className="border rounded px-2 py-1"
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Lost">Lost</option>
                      <option value="Found">Found</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="item" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Item
                    </label>
                    <Input
                      id="item"
                      placeholder="AirPods Pro"
                      onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="location"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Location
                    </label>
                    <Input
                      id="location"
                      placeholder="Queen's Campus"
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="date" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Date
                    </label>
                    <Input id="date" type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="contact"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Contact
                    </label>
                    <Input
                      id="contact"
                      placeholder="jane@email.com"
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed"
                    >
                      Description
                    </label>
                    <Input
                      id="description"
                      placeholder="Lost during morning jog, reward offered"
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </>
              )}
            </CardContent>
            <div className="flex justify-end space-x-2 p-4">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmitForm(activeModal)}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Submit
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
