"use client";
import { useState } from "react";
import {
  CalendarIcon,
  Wifi,
  Dumbbell,
  Leaf,
  Lock,
  Tv,
  BedDouble,
  Wind,
  Droplet,
  Croissant,
} from "lucide-react";
import Image from "next/image";
import ServiceCard from "@/components/service-card/services-card";
import { Feature, RoomSearch, Service } from "@/lib/interfaces";
import Summary from "../resume/resume";
import { Guests } from "../gusts/guests";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

const featureIconMap: { [key: string]: React.ReactNode } = {
  "Dos camas individuales": <BedDouble className="m-2 size-4" />,
  "Cama King Size": <BedDouble className="m-2 size-4" />,
  "Balcón Privado": <Wind className="m-2 size-4" />,
  Jacuzzi: <Droplet className="m-2 size-4" />,
  fast: <Croissant className="m-2 size-4" />,
};

const iconMap: { [key: string]: React.ReactNode } = {
  calendar: <CalendarIcon className="m-2 size-4" />,
  wifi: <Wifi className="m-2 size-4" />,
  dumbbell: <Dumbbell className="m-2 size-4" />,
  leaf: <Leaf className="m-2 size-4" />,
  lock: <Lock className="m-2 size-4" />,
  tv: <Tv className="m-2 size-4" />,
  cama: <BedDouble className="m-2 size-4" />,
  wind: <Wind className="m-2 size-4" />,
  droplet: <Droplet className="m-2 size-4" />,
  fast: <Croissant className="m-2 size-4" />,
};

const getServiceIcon = (serviceName: string): React.ReactNode => {
  const lowerCaseName = serviceName.toLowerCase();

  if (lowerCaseName.includes("wifi")) return iconMap.wifi;
  if (lowerCaseName.includes("gimnasio")) return iconMap.dumbbell;
  if (lowerCaseName.includes("tv")) return iconMap.tv;
  if (lowerCaseName.includes("seguro")) return iconMap.lock;

  return <Leaf className="m-2 size-4" />;
};

const RoomDetails: React.FC<{
  room: RoomSearch;
  services: Array<Service>;
  id: string;
}> = ({ room, services, id }) => {
  const [selectedServices, setSelectedServices] = useState<
    Array<{ name: string; price: number }>
  >([]);

  const handleServiceClick = (service: Service) => {
    setSelectedServices((prevServices) => {
      const isSelected = prevServices.some((s) => s.name === service.name);
      if (isSelected) {
        return prevServices.filter((s) => s.name !== service.name);
      } else {
        return [...prevServices, { name: service.name, price: service.price }];
      }
    });
  };

  const isSelected = (serviceType: string) => {
    return selectedServices.some((service) => service.name === serviceType);
  };

  const getCapacityMessage = (category: string) => {
    if (category.includes("loft")) {
      return "Hasta 4 personas";
    } else if (category.includes("suite")) {
      return "Hasta 2 personas";
    } else {
      return "Capacidad no especificada";
    }
  };

  return (
    <div className="flex flex-col justify-around lg:flex-row w-full mb-4 rounded-lg bg-[#faf9f5] border border-orange-300 p-4">
      <div className="flex-row ">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="flex mt-2 flex-col justify-center items-center">
              {room?.images && room.images.length > 0 && (
                <Carousel className="w-full max-w-md">
                  <CarouselContent>
                    {room.images.slice(0, 3).map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Image
                            src={image}
                            alt={`${room.category} image ${index + 1}`}
                            width={600}
                            height={600}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )}
            </div>
            <div className="flex w-[500px]">
              <Guests category={room.category} />
            </div>
          </div>
          <div className="ml-5 flex flex-1 flex-col gap-5">
            <div className="mt-5 flex flex-col gap-5">
              <h2 className="text-xl font-semibold uppercase">
                {room.category}
              </h2>
              <p className="text-lg text-black font-semibold">${room.price}</p>
              <p className="text-lg text-gray-600">
                {getCapacityMessage(room.category)}
              </p>
              <h2 className="text-xl font-semibold text-gray-600">
                Habitación Nro. {room.number}
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-semibold">Características:</h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {room.features.map((feature: Feature) => (
                  <div
                    key={feature.id}
                    className="flex size-20 flex-col items-center rounded-md border text-black"
                  >
                    {featureIconMap[feature.name] || (
                      <Leaf className="m-2 size-4" />
                    )}{" "}
                    <h1 className="mt-2 text-xs">{feature.name}</h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full">
              <h3 className="text-lg font-semibold">
                Puedes añadir servicios adicionales:
              </h3>
              <h3 className="text-xs text-gray-500">
                Se agrega a tu habitacion diariamente.
              </h3>
              <div className="mb-4 flex flex-wrap gap-2">
                {services.map((service: Service) => (
                  <div
                    className={`cursor-pointer rounded-lg ${
                      isSelected(service.name)
                        ? "bg-orange-300 hover:translate-y-2 transition-all duration-300 shadow-lg py-2 px-3  mt-2"
                        : "bg-white shadow-lg py-2 px-3 mt-2 hover:translate-y-2 transition-all duration-300"
                    }`}
                    key={service.id}
                    onClick={() => handleServiceClick(service)}
                  >
                    <ServiceCard
                      name={service.name}
                      price={service.price}
                      icon={getServiceIcon(service.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-7 mb-7 items-end">
        <Summary
          title={room.category}
          basePrice={room.price}
          additionalItems={selectedServices}
          id={id}
        />
      </div>
    </div>
  );
};

export default RoomDetails;
