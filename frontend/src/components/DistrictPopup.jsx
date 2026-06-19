function DistrictPopup({ district }) {
  return (
    <div style={{ minWidth: "250px" }}>
      <h3>{district.district} District</h3>

      <hr />

      <b>Number of Cities</b>
      <br />
      {district.cities ? district.cities.length : 1}

      <br />
      <br />

      <b>Total Cases</b>
      <br />
      {district.cases}

      <br />
      <br />

      <b>Risk Level</b>
      <br />
      {district.risk}

      <br />
      <br />

      <b>Top Crime</b>
      <br />
      {district.topCrime} ({district.topCrimeCases} cases)
    </div>
  );
}

export default DistrictPopup;