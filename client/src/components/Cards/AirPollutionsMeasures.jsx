import React from 'react';
import MeasuresCard from './temp';
import Tree from './trees.png';
import Vehicle from './vehicle.png';
import Greenspace from './greenspaces.png';
import Awareness from './awareness.png';
import Industry from './industry.png';

// Sample data for measures
const measuresData = [
  {
    title: 'Plant Trees',
    description: 'Planting trees is one of the most effective natural ways to improve air quality. Trees absorb carbon dioxide and release oxygen, helping to reduce pollution. Urban and rural tree plantations enhance green cover, control erosion, improve soil quality, and provide habitats for wildlife. Community efforts to plant and maintain trees can make a long-lasting impact on environmental health.',
    icon: Tree,
  },
  {
    title: 'Reduce Vehicle Emissions',
    description: 'Transportation contributes significantly to air pollution. By using public transport, carpooling, biking, or switching to electric vehicles, individuals can drastically reduce their carbon footprint. Promoting clean transportation infrastructure, such as EV charging stations and bike lanes, helps communities shift to greener travel options, reducing toxic emissions.',
    icon: Vehicle,
  },
  {
    title: 'Promote Renewable Energy',
    description: 'Switching from fossil fuels to renewable energy sources like solar, wind, and hydroelectric power reduces greenhouse gas emissions and lessens air pollution. Renewable energy supports cleaner air, conserves natural resources, and helps build sustainable communities. Implementing renewable solutions at local and national levels ensures a healthier environment and energy independence.',
    icon: Industry,
  },
  {
    title: 'Improve Waste Management',
    description: 'Effective waste management practices, such as waste segregation, recycling, and composting, prevent pollutants from landfills and reduce methane emissions. Properly managed waste treatment facilities and recycling programs minimize harmful emissions, helping protect air and soil quality. Encouraging sustainable consumption reduces waste generation and helps manage resources responsibly.',
    icon: Industry,
  },
  {
    title: 'Encourage Green Spaces',
    description: 'Creating parks, green belts, and urban forests enhances air quality by providing oxygen and cooling the urban environment. Green spaces promote biodiversity and offer recreation and relaxation for communities. Urban planning that includes green zones helps mitigate the heat island effect, making cities more resilient to climate change.',
    icon: Greenspace,
  },
  {
    title: 'Raise Awareness',
    description: 'Educating communities on the importance of clean air and pollution reduction empowers individuals to make informed choices. Environmental awareness programs and campaigns in schools, workplaces, and social media encourage sustainable practices. Understanding the consequences of pollution motivates collective action towards achieving cleaner air and a healthier planet.',
    icon: Awareness,
  },
];

const AirPollutionMeasures = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Measures to Control Air Pollution
      </h2>
      <div className="space-y-6">
        {measuresData.map((measure, index) => (
          <MeasuresCard 
            key={index} 
            title={measure.title} 
            description={measure.description} 
            icon={measure.icon} 
            index={index} // Pass index for alternating layout
          />
        ))}
      </div>
    </div>
  );
};

export default AirPollutionMeasures;
