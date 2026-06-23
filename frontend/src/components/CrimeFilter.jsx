function CrimeFilter({ selected, setSelected }) {
  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}
    >
      <option value="All">All Crimes</option>
      <option value="Fraud">Fraud</option>
      <option value="Cybercrime">Cybercrime</option>
      <option value="Mobile Theft">Mobile Theft</option>
      <option value="Domestic Violence">Domestic Violence</option>
    </select>
  );
}

export default CrimeFilter;