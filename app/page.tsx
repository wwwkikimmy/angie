"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  Mail,
  AlertCircle,
  Trash2,
} from "lucide-react"

export default function KingstonDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [formData, setFormData] = useState({})

  const [jobListings, setJobListings] = useState([
    {
      id: 1,
      title: "Software Developer",
      company: "Kingston Tech Solutions",
      location: "Downtown Kingston",
      salary: "$65,000 - $80,000",
      type: "Full-time",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Marketing Coordinator",
      company: "Queen's University",
      location: "University District",
      salary: "$45,000 - $55,000",
      type: "Full-time",
      posted: "1 week ago",
    },
    {
      id: 3,
      title: "Barista",
      company: "Local Coffee House",
      location: "Princess Street",
      salary: "$16/hour",
      type: "Part-time",
      posted: "3 days ago",
    },
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Kingston Farmers Market",
      date: "Every Saturday",
      time: "8:00 AM - 2:00 PM",
      location: "Market Square",
      category: "Market",
      attendees: 150,
    },
    {
      id: 2,
      title: "Live Music at The Mansion",
      date: "Dec 15, 2024",
      time: "8:00 PM",
      location: "The Mansion",
      category: "Entertainment",
      attendees: 45,
    },
    {
      id: 3,
      title: "Winter Festival",
      date: "Dec 20-22, 2024",
      time: "All Day",
      location: "Confederation Park",
      category: "Festival",
      attendees: 500,
    },
  ])

  const [rentals, setRentals] = useState([
    {
      id: 1,
      title: "2BR Apartment Downtown",
      price: "$1,800/month",
      location: "Princess Street",
      bedrooms: 2,
      bathrooms: 1,
      available: "Jan 1, 2025",
    },
    {
      id: 2,
      title: "Student Housing Near Queen's",
      price: "$650/month",
      location: "University District",
      bedrooms: 1,
      bathrooms: 1,
      available: "Available Now",
    },
    {
      id: 3,
      title: "3BR House with Yard",
      price: "$2,200/month",
      location: "Westbrook",
      bedrooms: 3,
      bathrooms: 2,
      available: "Feb 1, 2025",
    },
  ])

  const [marketplace, setMarketplace] = useState([
    {
      id: 1,
      title: "MacBook Pro 2021",
      price: "$1,200",
      seller: "Sarah M.",
      condition: "Excellent",
      posted: "1 day ago",
    },
    {
      id: 2,
      title: "Winter Bike",
      price: "$300",
      seller: "Mike D.",
      condition: "Good",
      posted: "3 days ago",
    },
    {
      id: 3,
      title: "Dining Table Set",
      price: "$450",
      seller: "Emma L.",
      condition: "Like New",
      posted: "1 week ago",
    },
  ])

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Kingston Plumbing Pro",
      category: "Plumbing",
      rating: 4.8,
      reviews: 127,
      phone: "(613) 555-0123",
      description: "24/7 emergency plumbing services",
    },
    {
      id: 2,
      name: "Clean Sweep Cleaning",
      category: "Cleaning",
      rating: 4.9,
      reviews: 89,
      phone: "(613) 555-0456",
      description: "Residential and commercial cleaning",
    },
    {
      id: 3,
      name: "Kingston Handyman",
      category: "Home Repair",
      rating: 4.7,
      reviews: 156,
      phone: "(613) 555-0789",
      description: "General home repairs and maintenance",
    },
  ])

  const [lostFound, setLostFound] = useState([
    {
      id: 1,
      type: "Lost",
      item: "Black Cat - Mittens",
      location: "Near Queen's Campus",
      date: "Dec 10, 2024",
      contact: "jane@email.com",
      description: "Small black cat with white paws, very friendly",
    },
    {
      id: 2,
      type: "Found",
      item: "iPhone 14",
      location: "Downtown Kingston",
      date: "Dec 12, 2024",
      contact: "(613) 555-0321",
      description: "Found near City Hall, blue case",
    },
    {
      id: 3,
      type: "Lost",
      item: "Car Keys",
      location: "Limestone City Markets",
      date: "Dec 11, 2024",
      contact: "mike@email.com",
      description: "Honda key fob with blue keychain",
    },
  ])

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
    const newId = Date.now() // Simple ID generation
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Kingston Local</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search Kingston..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Jobs
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="rentals" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Rentals
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="lost-found" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Lost & Found
            </TabsTrigger>
          </TabsList>

          {/* Job Hunting & Recruitment */}
          <TabsContent value="jobs">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Job Opportunities</h2>
                <Button onClick={handlePostJob}>Post a Job</Button>
              </div>
              <div className="grid gap-4">
                {jobListings.map((job) => (
                  <Card key={job.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{job.title}</CardTitle>
                          <CardDescription className="text-lg">{job.company}</CardDescription>
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
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
                        <Button size="sm" className="w-fit">
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
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Local Events */}
          <TabsContent value="events">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Local Events</h2>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge>{event.category}</Badge>
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
                        {event.attendees} attending
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Join Event</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Rentals */}
          <TabsContent value="rentals">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Rental Listings</h2>
                <Button onClick={handleListProperty}>List Property</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rentals.map((rental) => (
                  <Card key={rental.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{rental.title}</CardTitle>
                      <CardDescription className="text-xl font-semibold text-green-600">{rental.price}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {rental.location}
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span>{rental.bedrooms} bed</span>
                        <span>{rental.bathrooms} bath</span>
                      </div>
                      <div className="text-sm text-gray-600">Available: {rental.available}</div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Contact Landlord</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteRental(rental.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Marketplace */}
          <TabsContent value="marketplace">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Marketplace</h2>
                <Button onClick={handleSellItem}>Sell Item</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {marketplace.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-xl font-semibold text-green-600">{item.price}</CardDescription>
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
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Condition: {item.condition}</span>
                        <span className="text-gray-500">{item.posted}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Message Seller</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteMarketplaceItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Local Services */}
          <TabsContent value="services">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Local Services</h2>
                <Button onClick={handleListService}>List Service</Button>
              </div>
              <div className="grid gap-4">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <CardDescription>{service.category}</CardDescription>
                        </div>
                        <Badge variant="outline">{service.category}</Badge>
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
                            <Button size="sm">Book Service</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteService(service.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Lost and Found */}
          <TabsContent value="lost-found">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Lost & Found</h2>
                <Button onClick={handleReportItem}>Report Item</Button>
              </div>
              <div className="grid gap-4">
                {lostFound.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.item}</CardTitle>
                        <Badge variant={item.type === "Lost" ? "destructive" : "default"}>{item.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {item.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {item.contact}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">Contact</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteLostFound(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modal for forms */}
        {activeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {activeModal === "job" && "Post a Job"}
                  {activeModal === "event" && "Create Event"}
                  {activeModal === "rental" && "List Property"}
                  {activeModal === "marketplace" && "Sell Item"}
                  {activeModal === "service" && "List Service"}
                  {activeModal === "lost-found" && "Report Item"}
                </h3>
                <Button variant="ghost" size="sm" onClick={handleCloseModal}>
                  ×
                </Button>
              </div>

              <div className="space-y-4">
                {activeModal === "job" && (
                  <>
                    <Input
                      placeholder="Job Title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                      placeholder="Company Name"
                      value={formData.company || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    />
                    <Input
                      placeholder="Location"
                      value={formData.location || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                    <Input
                      placeholder="Salary Range"
                      value={formData.salary || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Job Description"
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </>
                )}

                {activeModal === "event" && (
                  <>
                    <Input
                      placeholder="Event Title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                      placeholder="Date"
                      type="date"
                      value={formData.date || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    />
                    <Input
                      placeholder="Time"
                      type="time"
                      value={formData.time || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    />
                    <Input
                      placeholder="Location"
                      value={formData.location || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                    <Input
                      placeholder="Category"
                      value={formData.category || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Event Description"
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </>
                )}

                {activeModal === "rental" && (
                  <>
                    <Input
                      placeholder="Property Title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                      placeholder="Monthly Rent"
                      value={formData.price || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    />
                    <Input
                      placeholder="Location"
                      value={formData.location || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                    <Input
                      placeholder="Bedrooms"
                      type="number"
                      value={formData.bedrooms || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
                    />
                    <Input
                      placeholder="Bathrooms"
                      type="number"
                      value={formData.bathrooms || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))}
                    />
                    <Input
                      placeholder="Available Date"
                      type="date"
                      value={formData.available || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, available: e.target.value }))}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Property Description"
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </>
                )}

                {activeModal === "marketplace" && (
                  <>
                    <Input
                      placeholder="Item Title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <Input
                      placeholder="Price"
                      value={formData.price || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    />
                    <Input
                      placeholder="Condition"
                      value={formData.condition || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, condition: e.target.value }))}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Item Description"
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </>
                )}

                {activeModal === "service" && (
                  <>
                    <Input
                      placeholder="Service Name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      placeholder="Category"
                      value={formData.category || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={formData.phone || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                    <Input
                      placeholder="Email"
                      value={formData.email || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Service Description"
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </>
                )}

                {activeModal === "lost-found" && (
                  <>
                    <select
                      className="w-full p-2 border rounded"
                      value={formData.type || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                    >
                      <option value="">Select Type</option>
                      <option value="lost">Lost</option>
                      <option value="found">Found</option>
                    </select>
                    <Input
                      placeholder="Item Description"
                      value={formData.item || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, item: e.target.value }))}
                    />
                    <Input
                      placeholder="Location"
                      value={formData.location || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    />
                    <Input
                      placeholder="Date"
                      type="date"
                      value={formData.date || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    />
                    <Input
                      placeholder="Contact Information"
                      value={formData.contact || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
                    />
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Additional Details"
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </>
                )}

                <div className="flex gap-2 pt-4">
                  <Button onClick={() => handleSubmitForm(activeModal)} className="flex-1">
                    Submit
                  </Button>
                  <Button variant="outline" onClick={handleCloseModal} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
