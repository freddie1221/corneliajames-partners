export default function mapReturnStatus(status) {
  const statusMap = {
    OPEN: 'Awaiting Items',
    CANCELLED: 'Cancelled',
    CLOSED: 'Complete',
  };

  return statusMap[status] || status
}