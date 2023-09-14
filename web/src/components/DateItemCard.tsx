import { Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import moment from "moment";
import { Link } from "react-router-dom";

type TemplateCardProps = {
  id: string;
  name: string;
  cover: string;
  description: string;
  create_time: string;
};

export const DateItemCard = ({
  id,
  name,
  cover,
  description,
  create_time,
}: TemplateCardProps) => {
  return (
    <>
      <Card
        isPressable
        as={Link}
        to={`/dates/${id}/list`}
        isFooterBlurred
        className=" h-[300px] w-[200px] relative cursor-pointer"
      >
        <CardHeader className="absolute z-10 top-0 flex flex-col items-start text-white  backdrop-blur-sm">
          <p className="font-bold">{name}</p>
          <p className="text-xs">{description}</p>
        </CardHeader>
        <Image
          removeWrapper
          isZoomed
          className=" w-full h-full object-cover z-0"
          src={cover}
        ></Image>
        <CardFooter className="absolute z-10 bottom-0 flex flex-row">
          <p className="text-xs">
            {moment(create_time).format("YYYY/MM/DD HH:mm:ss")}
          </p>
        </CardFooter>
      </Card>
    </>
  );
};
