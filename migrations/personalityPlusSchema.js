exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('personalityPlus', function(table) {
      table.increments();
	 // table.string("id"),
	  table.string("sessionID"),
      table.string("time_stamp"),
      table.string("token"),
      table.string("name"),
      table.string("email"),
      table.string("ACH"),
      table.string("ADP"),
      table.string("AGR"),
      table.string("ANL"),
      table.string("ASR"),
      table.string("COL"),
      table.string("COM"),
      table.string("DET"),
      table.string("DUT"),
      table.string("LOC"),
      table.string("EFN"),
      table.string("EMS"),
      table.string("EMP"),
      table.string("ENT"),
      table.string("EXP"),
      table.string("HUM"),
      table.string("NDP"),
      table.string("NDV"),
      table.string("NFL"),
      table.string("NGN"),
      table.string("NTV"),
      table.string("NQS"),
      table.string("NTL"),
      table.string("NRT"),
      table.string("ORG"),
      table.string("PRS"),
      table.string("PLN"),
      table.string("PRP"),
      table.string("RTN"),
      table.string("RSR"),
      table.string("RST"),
      table.string("RSK"),
      table.string("SOC"),
      table.string("TLR"),
      table.string("TRS"),
      table.string("VRS"),
      table.string("VIS"),
      table.string("language"),
      table.string("gender"),
      table.string("age"),
      table.string("occupation"),
      table.string("testID"),
      table.string("userID"),
      table.string("mobile"),
      table.string("university"),
      table.string("governorate")
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('personalityPlus')
  ])
};
