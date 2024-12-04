"use client";
import React, { useState } from 'react';
import TableauEmbed from "./components/TableauEmbed";
import SideBar from "./components/Sidebar";

export default function App() {
    const [filters, setFilters] = useState(null);  // State for filters
    const [selectedProvince, setSelectedProvince] = useState(null);  // State for selected province
    const [selectedCounty, setSelectedCounty] = useState(null);  // State for selected province
    const tableauUrl = 'https://public.tableau.com/views/cardio-map/Dashboard1';
    
    // Handle province selection
    const handleProvinceSelected = (province) => {
        setSelectedProvince(province);
    };
    const handleCountySelected = (county) => {
        setSelectedCounty(county);
    };
    return (
        <div className="flex flex-row justify-between max-h-screen overflow-hidden">
            <SideBar filters={filters} selectedProvince={selectedProvince} selectedCounty={selectedCounty} />  {/* Pass selectedProvince to SideBar */}
            <TableauEmbed 
                tableauVizUrl={tableauUrl}
                onFiltersChange={setFilters}
                onProvinceSelected={handleProvinceSelected}
                onCountySelected={handleCountySelected}
            />
        </div>
    );
}
