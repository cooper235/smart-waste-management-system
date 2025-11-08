"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import Layout from "../components/layout/Layout"
import BinCard from "../components/BinCard"
import DashboardChart from "../components/DashboardChart"
import { AlertCircle, CheckCircle } from "lucide-react"

const Dashboard = () => {
  const [bins, setBins] = useState([])
  const [camera, setCamera] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const binsResponse = await axios.get("http://localhost:5000/api/bins")
        const binsData = binsResponse.data.data || []

        setBins(
          binsData.map((bin) => ({
            ...bin,
            type: bin.category || bin.type,
            fillLevel: bin.fillLevel || 0,
          })),
        )
        setError(null)
      } catch (error) {
        console.error("Error fetching bins:", error)
        setError("Failed to load dashboard data. Please check if the backend is running.")
        // Set default data on error
        setBins([
          { _id: "1", type: "Dry Waste", fillLevel: 75, category: "Dry Waste" },
          { _id: "2", type: "Wet Waste", fillLevel: 50, category: "Wet Waste" },
          { _id: "3", type: "Plastic Waste", fillLevel: 30, category: "Plastic Waste" },
          { _id: "4", type: "Metal Waste", fillLevel: 20, category: "Metal Waste" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    const cameraFeedUrl =
      localStorage.getItem("cameraFeedUrl") ||
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0NDQ0NDQyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiBmaWxsPSIjODg4ODg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TGl2ZSBDYW1lcmEgRmVlZDwvdGV4dD48L3N2Zz4="
    setCamera({
      image: cameraFeedUrl,
      detected: "Plastic Bottle",
    })

    setAlerts([
      { id: "alert-1", message: "Anomaly detected in Zone 3: Overfilled Plastic Bin", type: "warning" },
      { id: "alert-2", message: "Scheduled maintenance due for Bin A01", type: "info" },
    ])
  }, [])

  return (
    <Layout>
      <div className="space-y-6">
        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium">{error}</div>
        )}

        {/* Live Bin Status and Camera Feed Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Bin Status */}
          <Card className="col-span-2 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Bins Overview</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A8D5A2] mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading bins...</p>
              </div>
            ) : bins.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {bins.map((bin) => (
                  <BinCard key={bin.id} bin={bin} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No bins found</div>
            )}
          </Card>

          {/* Live Camera Feed */}
          <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Camera Feed</h2>
            <div className="relative rounded-xl overflow-hidden border border-gray-200">
              <img 
                src="/images/camera-feed.jpg" 
                alt="Live camera feed of waste collection point"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                LIVE
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Main Collection Point - IIT Mandi</p>
              <p className="text-xs text-gray-400 mt-1">Last updated: {new Date().toLocaleString()}</p>
            </div>
          </Card>
        </div>

        {/* Chart Section */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Waste Collection Map</h2>
          <div className="h-96">
            <DashboardChart type="map" />
          </div>
        </Card>

        {/* Anomaly Alerts & Maintenance Logs */}
        <Card className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h4 className="text-2xl font-bold mb-6 text-gray-800">Anomaly Alerts & Maintenance Logs</h4>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-[#A8D5A2] p-4 rounded-xl text-gray-800 transition-all hover:shadow-md cursor-pointer flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{alert.message}</span>
                {alert.timestamp && (
                  <span className="text-xs text-gray-600 ml-auto">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                )}
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <CheckCircle className="w-8 h-8 mx-auto text-green-400 mb-2" />
                <p>No active alerts</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default Dashboard
