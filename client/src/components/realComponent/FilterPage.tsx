import { filterOptions } from "@/contants/filterData"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"


const Filter = () => {

  const appliedFilterHandler = (value:string)=>{
   
  }

  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant={"link"}>Reset</Button>
      </div>
       
       {
        filterOptions.map((option)=>(
          <div key={option.id} className="flex items-center space-x-2 my-5">
              <Checkbox
                id={option.id}
                onClick={()=> appliedFilterHandler(option.label)}
              />
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{option.label}</Label>
          </div>
        ))
       }
     
    </div>
  )
}

export default Filter