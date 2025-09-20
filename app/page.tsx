"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calculator, MapPin, Users, DollarSign } from "lucide-react"

interface Museum {
  id: string
  name: string
  location: string
  prices: {
    adult: number
    child: number
    senior: number
    student: number
  }
}

const museums: Museum[] = [
  {
    id: "met",
    name: "Metropolitan Museum of Art",
    location: "Upper East Side",
    prices: { adult: 30, child: 0, senior: 22, student: 17 },
  },
  {
    id: "moma",
    name: "Museum of Modern Art (MoMA)",
    location: "Midtown",
    prices: { adult: 25, child: 0, senior: 18, student: 14 },
  },
  {
    id: "guggenheim",
    name: "Guggenheim Museum",
    location: "Upper East Side",
    prices: { adult: 30, child: 0, senior: 22, student: 22 },
  },
  {
    id: "amnh",
    name: "American Museum of Natural History",
    location: "Upper West Side",
    prices: { adult: 28, child: 16.5, senior: 22, student: 22 },
  },
  {
    id: "brooklyn",
    name: "Brooklyn Museum",
    location: "Brooklyn",
    prices: { adult: 20, child: 0, senior: 12, student: 12 },
  },
  {
    id: "whitney",
    name: "Whitney Museum",
    location: "Meatpacking District",
    prices: { adult: 30, child: 0, senior: 24, student: 24 },
  },
]

export default function TicketCalculator() {
  const [selectedMuseum, setSelectedMuseum] = useState<Museum | null>(null)
  const [visitors, setVisitors] = useState({
    adult: 0,
    child: 0,
    senior: 0,
    student: 0,
  })

  const calculateTotal = () => {
    if (!selectedMuseum) return 0

    return (
      visitors.adult * selectedMuseum.prices.adult +
      visitors.child * selectedMuseum.prices.child +
      visitors.senior * selectedMuseum.prices.senior +
      visitors.student * selectedMuseum.prices.student
    )
  }

  const updateVisitorCount = (type: keyof typeof visitors, value: string) => {
    const count = Math.max(0, Number.parseInt(value) || 0)
    setVisitors((prev) => ({ ...prev, [type]: count }))
  }

  const totalVisitors = Object.values(visitors).reduce((sum, count) => sum + count, 0)
  const totalCost = calculateTotal()

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calculator className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">NYC Museum Ticket Calculator</h1>
          </div>
          <p className="text-muted-foreground text-lg">Calculate admission costs for New York City's premier museums</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Museum Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Select Museum
              </CardTitle>
              <CardDescription>Choose from NYC's most popular museums</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {museums.map((museum) => (
                  <Card
                    key={museum.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedMuseum?.id === museum.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedMuseum(museum)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-card-foreground">{museum.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {museum.location}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            Adult: ${museum.prices.adult}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Child: ${museum.prices.child === 0 ? "Free" : museum.prices.child}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visitor Count & Pricing */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Visitor Information
                </CardTitle>
                <CardDescription>Enter the number of visitors by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedMuseum ? (
                  <div className="space-y-4">
                    {Object.entries(selectedMuseum.prices).map(([type, price]) => (
                      <div key={type} className="space-y-2">
                        <Label htmlFor={type} className="capitalize font-medium">
                          {type} - ${price === 0 ? "Free" : price}
                        </Label>
                        <Input
                          id={type}
                          type="number"
                          min="0"
                          value={visitors[type as keyof typeof visitors]}
                          onChange={(e) => updateVisitorCount(type as keyof typeof visitors, e.target.value)}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Please select a museum first</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Price Summary */}
            {selectedMuseum && totalVisitors > 0 && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Price Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Museum:</span>
                      <span className="text-sm">{selectedMuseum.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Visitors:</span>
                      <Badge variant="secondary">{totalVisitors}</Badge>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      {Object.entries(visitors).map(([type, count]) => {
                        if (count === 0) return null
                        const price = selectedMuseum.prices[type as keyof typeof selectedMuseum.prices]
                        return (
                          <div key={type} className="flex justify-between text-sm">
                            <span className="capitalize">
                              {count} {type}
                              {count > 1 ? "s" : ""}
                            </span>
                            <span>${(count * price).toFixed(2)}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Cost:</span>
                      <span className="text-primary">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Book Tickets
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
