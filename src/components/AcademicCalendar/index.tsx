import React, { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { Button, Group, Stack } from '@mantine/core';
import ShadowContainer from '@site/src/components/ShadowContainer';
import 'dayjs/locale/zh-cn';

export interface PredefinedRange {
  label: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface AcademicCalendarProps {
  predefinedRanges: PredefinedRange[];
  initialValue?: [Date | null, Date | null];
  initialDate?: Date;
}

function AcademicCalendar({
  predefinedRanges,
  initialValue = [null, null],
  initialDate = new Date(),
}: AcademicCalendarProps) {

  const [value, setValue] = useState<[Date | null, Date | null]>(initialValue);
  const [date, setDate] = useState<Date>(initialDate);

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
            variant={preset.startDate === null && preset.endDate === null ? 'outline' : 'filled'} // Example: different style for clear button
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
        locale="zh-cn"
        maxLevel="year"
        numberOfColumns={1}
        size="lg"
      />
    </Stack>
    </ShadowContainer>
  );
}

export default AcademicCalendar;