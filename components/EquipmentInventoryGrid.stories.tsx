import {
  EquipmentInventoryGrid,
  defaultEquipmentInventoryItems
} from "@/components/EquipmentInventoryGrid";

export default {
  title: "SCALE/EquipmentInventoryGrid",
  component: EquipmentInventoryGrid
};

export const Default = {
  args: {
    items: defaultEquipmentInventoryItems
  }
};
