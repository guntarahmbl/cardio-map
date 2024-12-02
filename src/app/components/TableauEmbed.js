"use client";
import React, { useEffect } from 'react';

export default function TableauEmbed({ tableauVizUrl, onFiltersChange, onProvinceSelected }) {
    useEffect(() => {
        const scriptId = 'tableau-api';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js';
            script.type = 'module';
            script.async = true;
            document.body.appendChild(script);
        }

        const onVizLoaded = async () => {
            const tableauViz = document.getElementById('tableauViz');
            tableauViz.addEventListener('firstinteractive', async (event) => {
                try {
                    const viz = event.target;
                    const workbook = await viz.workbook;
                    const activeSheet = await workbook.activeSheet;
                    const worksheets = await activeSheet.worksheets;
                    const worksheet = worksheets[1];

                    // Add event listener for mark selection changes
                    viz.addEventListener('markselectionchanged', async () => {
                        try {
                            const selectedMarks = await worksheet.getSelectedMarksAsync();
                            console.log('Selected Marks:', selectedMarks);

                            if (selectedMarks && selectedMarks.data && selectedMarks.data.length > 0) {
                                selectedMarks.data.forEach((rowData, rowIndex) => {
                                    console.log(`Row ${rowIndex} Data:`, rowData);
                                    
                                    // Ensure rowData._data exists and has the expected structure
                                    if (rowData._data && rowData._data[0] && rowData._data[0][1]) {
                                        const provinceObj = rowData._data[0][1];
                                        console.log("provinceObj: ", provinceObj);
                                        if (provinceObj && provinceObj._value) {
                                            const provinceName = provinceObj._value;
                                            console.log(`Selected Province: ${provinceName}`);
                                            onProvinceSelected(provinceName);
                                        } else {
                                            console.log('No _value found for Provinsi');
                                        }
                                    } else {
                                        console.log('No data for province or incorrect structure');
                                        onProvinceSelected(null);
                                    }
                                });
                            } else {
                                console.log('No marks selected');
                                onProvinceSelected(null);
                            }
                        } catch (error) {
                            console.error('Error fetching selected marks:', error);
                            onProvinceSelected(null);
                        }
                    });

                    // Add event listener for filter changes
                    viz.addEventListener('filterchanged', async () => {
                        try {
                            const filters = await worksheet.getFiltersAsync();
                            const penyakitFilter = filters.find(filter => filter.fieldName === 'Penyakit');
                            console.log('Filters Changed:', filters);

                            if (penyakitFilter) {
                                const processedFilter = penyakitFilter.appliedValues 
                                    ? penyakitFilter.appliedValues.map(val => val.value)
                                    : [];
                                console.log('Penyakit Filter:', processedFilter);
                                onFiltersChange(processedFilter);
                            } else {
                                onFiltersChange(null);
                            }
                        } catch (error) {
                            console.error('Error fetching filters:', error);
                            onFiltersChange(null);
                        }
                    });

                    // Initial filter update
                    const updatePenyakitFilter = async () => {
                        const filters = await worksheet.getFiltersAsync();
                        const penyakitFilter = filters.find(filter => filter.fieldName === 'Penyakit');
                        
                        if (penyakitFilter) {
                            const processedFilter = penyakitFilter.appliedValues 
                                ? penyakitFilter.appliedValues.map(val => val.value)
                                : [];
                            onFiltersChange(processedFilter);
                        } else {
                            onFiltersChange(null);
                        }
                    };

                    await updatePenyakitFilter();
                } catch (error) {
                    console.error('Error setting up TableauViz:', error);
                    onFiltersChange(null);
                    onProvinceSelected(null);
                }
            });
        };

        onVizLoaded();
    }, [onFiltersChange, onProvinceSelected]);

    return (
        <div>
            {/* Tableau Visualization */}
            <tableau-viz
                id="tableauViz"
                src={tableauVizUrl}
                height="110vh"
                width="75vw"
            ></tableau-viz>
        </div>
    );
}
