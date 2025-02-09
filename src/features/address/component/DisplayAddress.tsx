import { Badge } from "@/components/ui/badge";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { IResGetAddressApi } from "@/services/user/address";
import { ReactNode } from "react";

type IDisplayAddress = IResGetAddressApi & {
  selectedAddress: string;
  hideRadio?: boolean;
  children?: ReactNode;
};

const DisplayAddress = (props: IDisplayAddress) => {
  return (
      <label htmlFor={props.id} className="w-full">
        <div className="flex justify-between">
          <p className="font-medium ">{props.address.name}</p>
          <Badge
            variant="outline"
            className="border uppercase border-success text-success"
          >
            {props.type}
          </Badge>
        </div>
        <p>{props.address.address}</p>
        <p>
          {props.address.city}, &nbsp; {props.address.state}{" "}
          {props.address.pincode}
        </p>

        {props.id === props.selectedAddress ? (
          <>
            <p className="my-2">
              <span>Mobile:</span> <span>{props.address.mobileNo}</span>
            </p>
          </>
        ) : (
          ""
        )}

        {props.children}
      </label>
  );
};

export default DisplayAddress;
