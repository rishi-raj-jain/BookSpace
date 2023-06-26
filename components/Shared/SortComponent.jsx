import { Select } from '@geist-ui/core'

export default function ({ selectedValue, setSelectedValue, setSortType, selectedStatus, setSelectedStatus }) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      <Select
        placeholder="Sort By"
        value={selectedValue}
        onChange={(val) => {
          setSelectedValue(val)
          if (val.toLowerCase() === 'oldest') {
            setSortType(2)
          } else {
            setSortType(1)
          }
        }}
      >
        <Select.Option value="Latest">Latest</Select.Option>
        <Select.Option value="Oldest">Oldest</Select.Option>
      </Select>
      <Select
        value={selectedStatus}
        placeholder="Select Status"
        onChange={(val) => {
          setSelectedStatus(val)
        }}
      >
        <Select.Option value="approved">Approved</Select.Option>
        <Select.Option value="pending">Pending</Select.Option>
        <Select.Option value="rejected">Rejected</Select.Option>
      </Select>
    </div>
  )
}
