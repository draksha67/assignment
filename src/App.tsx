import { InputField } from './components/InputField/InputField';
import { DataTable } from './components/DataTable/DataTable';
import { useState } from 'react';

function App() {
  const [inputValue,setinputValue] = useState('')
  return (
    <div className="p-4">
      <InputField
        label="Username"
        placeholder="Enter username"
        helperText="Must be unique"
        variant="outlined"
        size="md"
        value={inputValue}
        onChange={(e) => setinputValue(e.target.value)}
      />

      <DataTable
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
          { key: 'email', title: 'Email', dataIndex: 'email' },
        ]}
        data={[
          { name: 'Raksha', email: 'raksha@example.com' },
          { name: 'Dixit', email: 'dixit@example.com' },
        ]}
        selectable
      />
    </div>
  );
}

export default App;
