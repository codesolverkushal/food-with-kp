import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RestaurantFormSchema, restaurantSchema } from "@/schema/restaurantSchema";
import useRestaurantStore from "@/store/useRestaurantStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined

  })

  const [error, setError] = useState<Partial<RestaurantFormSchema>>({});
  const {loading} = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setError(fieldError as Partial<RestaurantFormSchema>);
      return;
    }
    
  }

  
  const restaurantExists = false;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-xl mb-5">Add Restaurant</h1>
          <form onSubmit={submitHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  placeholder="Enter your restaurant name"
                />
                {error && <span className="text-xs text-red-500 font-medium">{error.restaurantName}</span>}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city name"
                />
                {error && <span className="text-xs text-red-500 font-medium">{error.city}</span>}

              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country name"
                />
                {error && <span className="text-xs text-red-500 font-medium">{error.country}</span>}

              </div>
              <div>
                <Label>Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Expected Delivery time"
                />
                {error && <span className="text-xs text-red-500 font-medium">{error.deliveryTime}</span>}

              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) => setInput({ ...input, cuisines: e.target.value.split(",") })}
                  placeholder="eg: biryani, kadai paneer, poha"
                />
                {error && <span className="text-xs text-red-500 font-medium">{error.cuisines}</span>}

              </div>
              <div>
                <Label>Upload Image</Label>
                <Input
                  onChange={(e)=> setInput({...input,imageFile:e.target.files?.[0] || undefined})}
                  type="file"
                  accept="image/*"
                  name="imageFile"
                   />
                {error && <span className="text-xs text-red-500 font-medium">{error.imageFile?.name || "Image file is required!"}</span>}

              </div>
            </div>
            <div className="my-5 w-fit">
              {
                loading ? (
                  <Button disabled className="bg-amber-600">
                    <Loader2 className="mr-2 h-4 w-6 animate-spin" />
                    Please wait...
                  </Button>
                ) : (
                  <Button className="bg-amber-700 hover:bg-amber-600">
                    {restaurantExists ? 'Update your restaurant' : 'Add your restaurant'}
                  </Button>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Restaurant