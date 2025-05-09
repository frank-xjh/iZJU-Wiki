import React, { useState, useMemo } from 'react';
import { DatePicker } from '@mantine/dates';
import { Paper, Group, Stack, Timeline, Text, Anchor } from '@mantine/core';
import ShadowContainer from '@site/src/components/ShadowContainer';
import 'dayjs/locale/zh-cn';

export interface PredefinedRange {
  label: string;
  startDate: string | null;
  endDate: string | null;
  icon?: React.ReactNode;
  line?: 'solid' | 'dashed' | 'dotted';
}

interface AcademicCalendarProps {
  predefinedRanges: PredefinedRange[];
}

function AcademicCalendar({
  predefinedRanges,
}: AcademicCalendarProps) {

  const [value, setValue] = useState<[string | null, string | null]>();
  const [date, setDate] = useState<string>();

  const handlePresetClick = (startDate: string | null, endDate: string | null) => {
    setValue([startDate, endDate]);
    setDate(startDate);
  };

  const activeIndex = useMemo(() => {
    const today = new Date();
    const passedCount = predefinedRanges.filter(preset =>
        preset.startDate &&
        preset.startDate < today.toISOString().split("T")[0]
    ).length;
    return passedCount - 1;
  }, [predefinedRanges])

  return (
    <>
      <Group align="flex-start" mt="xl" gap="xl">
        <ShadowContainer>
        <Paper shadow="sm" radius="md" withBorder p="xs">
          <DatePicker
            date={date}
            onDateChange={setDate}
            type="range"
            value={value}
            allowSingleDateInRange
            locale="zh-cn"
            maxLevel="year"
            size="xl"
          />
          </Paper>
        </ShadowContainer>
        <Timeline bulletSize={24} lineWidth={2} active={activeIndex}>
          {predefinedRanges.map((preset) => (
            <Timeline.Item
              bullet={preset.icon ? preset.icon : undefined}
              title={preset.label}
              mt="md"
              lineVariant={preset.line}
            >
              <Text c="dimmed" size="sm" mb={0}>
                {`${preset.startDate} - ${preset.endDate}`}
              </Text>
              <Anchor
                component="button"
                type="button"
                size="xs"
                onClick={() => handlePresetClick(preset.startDate, preset.endDate)}
              >
                {'选择此时段'}
              </Anchor>
            </Timeline.Item>
          ))}
        </Timeline>
      </Group>
    </>
  );
}

export default AcademicCalendar;