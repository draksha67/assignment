import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable} from "./DataTable";
import type { Column } from './DataTable';



type User = {
  name: string;
  age: number;
  email: string;
};

const sampleData: User[] = [
  { name: "Raksha", age: 22, email: "raksha@example.com" },
  { name: "Aryan", age: 25, email: "aryan@example.com" },
  { name: "Riya", age: 28, email: "riya@example.com" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<User[]>([]);
    return (
      <div className="p-4">
        <DataTable<User>
          data={sampleData}
          columns={columns}
          selectable
          onRowSelect={setSelected}
        />
        <div className="mt-4 text-sm text-gray-600">
          <strong>Selected Rows:</strong>
          <pre>{JSON.stringify(selected, null, 2)}</pre>
        </div>
      </div>
    );
  },
};
