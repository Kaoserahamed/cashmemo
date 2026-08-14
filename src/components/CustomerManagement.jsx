import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'

const CustomerManagement = ({
  customers,
  formCustomer,
  onFormChange,
  onSave,
  onReset,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid gap-3 lg:gap-4 lg:grid-cols-2">
      <div>
        <CustomerForm
          customer={formCustomer}
          onChange={onFormChange}
          onSave={onSave}
          onReset={onReset}
        />
      </div>
      <div>
        <CustomerList
          customers={customers}
          selectedCustomerId={formCustomer.id}
          onSelect={onEdit}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

export default CustomerManagement
