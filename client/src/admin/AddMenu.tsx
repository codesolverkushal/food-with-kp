import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { img6, img7 } from "@/contants/data";
import { LoaderIcon, Plus } from "lucide-react";
import { FormEvent, useState } from "react"
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";

const menus = [
  {
    name: "Biryani",
    description: "Perfected over generations, delivering authentic flavors you can trust!",
    price: 100,
    image: img6
  },
  {
    name: "Tadka Biryani",
    description: "Perfected over generations, delivering authentic flavors you can trust!",
    price: 150,
    image: img7
  },
]

const AddMenu = () => {
  const [input,setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price:0,
    image:undefined
  })
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
  const [editOpen,setEditOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu,setSelectedMenu] = useState<any>();

  const loading = false;

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setError(fieldError as Partial<MenuFormSchema>);
      return;
    }
     console.log(input);
  }

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">Available Menu</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange hover:bg-hoverOrange">
              <Plus className="mr-2" />
              Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new Menu</DialogTitle>
              <DialogDescription>Create a menu that will make your restaurant stand Out.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter menu name"
                />
                {error && <span className="text-sm text-red-500">{error.name}</span>}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Add menu description"
                />
                 {error && <span className="text-sm text-red-500">{error.description}</span>}
              </div>
              <div>
                <Label>Price in (Rupees)</Label>
                <Input
                  type="text"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter menu price"
                />
                 {error && <span className="text-sm text-red-500">{error.price}</span>}
              </div>
              <div>
                <Label>Upload menu image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput({ ...input, image: e.target.files?.[0] || undefined })
                  }
                />
                  {error && <span className="text-xs text-red-500 font-medium">{error.image?.name || "Image file is required!"}</span>}
              </div>

              <DialogFooter className="mt-5">
                {
                  loading ? (
                    <Button disabled>
                      <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please Wait...
                    </Button>
                  ) : (
                    <Button>Submit</Button>
                  )
                }
              </DialogFooter>

            </form>
          </DialogContent>

        </Dialog>
      </div>
      {menus.map((menu: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt=""
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-sm tex-gray-600 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              size={"sm"}
              className="bg-gradient-to-r from-amber-500 to-amber-400 text-white hover:from-amber-400 hover:to-amber-500 
             shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 mt-2"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}

      <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen}/>
    </div>
  )
}

export default AddMenu