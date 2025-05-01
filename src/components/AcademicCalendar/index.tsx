import React, { useState, useEffect } from "react";
import { DatePicker } from "@mantine/dates";
import { Button, Group, Stack } from "@mantine/core";
import ShadowContainer from "@site/src/components/ShadowContainer";

const predefinedRanges = [
  {
    label: '五一假期 (5.1 - 5.5)',
    startDate: new Date(2025, 4, 1),
    endDate: new Date(2025, 4, 5),
  },
  {
    label: '清空选择',
    startDate: null,
    endDate: null,
  },
];

function AcademicCalendar() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [date, setDate] = useState<Date>(new Date());

  const handlePresetClick = (startDate: Date | null, endDate: Date | null) => {
    setValue([startDate, endDate]);
    setDate(startDate);
  };

  return (
    <ShadowContainer>
      <Stack align="center">
        <Group>
          {predefinedRanges.map((preset) => (
            <Button
              key={preset.label}
              onClick={() => handlePresetClick(preset.startDate, preset.endDate)}
              variant={preset.label === '清空选择' ? 'outline' : 'filled'}
            >
              {preset.label}
            </Button>
          ))}
        </Group>

        <DatePicker
          date={date}
          onDateChange={setDate}

          type="range"
          value={value}
          allowSingleDateInRange

          maxLevel="year"
          numberOfColumns={1}
          size="lg"
        />
      </Stack>
    </ShadowContainer>
  );
};

export default AcademicCalendar;
