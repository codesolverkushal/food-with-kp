import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const Checkout = ({open,setOpen}:{open:boolean;setOpen:Dispatch<SetStateAction<boolean>>}) => {
    const loading = false;
    const [input, setInput] = useState({
        name:  "",
        email: "",
        contact:  "",
        address: "",
        city:  "",
        country: "",
      });
    const changeEventHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const checkoutHandler = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(input);
    } 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle> Review Your Order</DialogTitle>
        <DialogDescription className="text-xs">
            Just check your order and confirm your order!!!
        </DialogDescription>
        <form onSubmit={checkoutHandler} className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
        <div>
            <Label>Fullname</Label>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              disabled
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Contact</Label>
            <Input
              type="text"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              name="city"
              value={input.city}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              name="country"
              value={input.country}
              onChange={changeEventHandler}
            />
          </div>  

          <DialogFooter className="col-span-2 pt-5">
            {loading ? (
              <Button disabled className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="bg-orange hover:bg-hoverOrange">
                Continue To Payment
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Checkout