import { Check, ChevronDown, Download } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, ScreenLayout } from '../../components/ScreenLayout';

const periods = ['7 Days', '14 Days', '21 Days', '30 Days'];
const trend = [65, 70, 68, 75, 80, 85, 92];
const dates = ['7/30', '7/31', '8/1', '8/2', '8/3', '8/4', '8/5'];

export default function ReportsScreen() {
  const [selectedRange, setSelectedRange] = useState('7 Days');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSelect = (period: string) => {
    setSelectedRange(period);
    setMenuVisible(false);
  };

  const handleDownload = () => {
    Alert.alert('Report Downloaded', `Your report for the last ${selectedRange} has been downloaded.`);
  };

  return (
    <ScreenLayout title="Reports" scrollable={false}>
      {/* Period dropdown */}
      <Card>
        <Text style={styles.cardTitle}>Select Period</Text>
        <TouchableOpacity
          style={styles.dropdown}
          activeOpacity={0.8}
          onPress={() => setMenuVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedRange}</Text>
          <ChevronDown size={20} color="#64748B" />
        </TouchableOpacity>
      </Card>

      {/* Dropdown options */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>Select Period</Text>
            {periods.map((period) => {
              const active = period === selectedRange;
              return (
                <TouchableOpacity
                  key={period}
                  style={[styles.option, active && styles.optionActive]}
                  activeOpacity={0.7}
                  onPress={() => handleSelect(period)}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>
                    {period}
                  </Text>
                  {active && <Check size={18} color="#15803D" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Summary */}
      <Card>
        <Text style={styles.cardTitle}>Summary</Text>

        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Average Health Score</Text>
          <Text style={styles.metricValue}>92%</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Growth Average</Text>
          <Text style={styles.metricValue}>+14g / day</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Mortality Rate</Text>
          <Text style={[styles.metricValue, { color: '#16A34A' }]}>1.2%</Text>
        </View>
      </Card>

      {/* Health trend (fills the remaining space) */}
      <Card style={styles.trendCard}>
        <Text style={styles.cardTitle}>Health Trend</Text>

        <View style={styles.chart}>
          {[100, 75, 50, 25, 0].map((n) => (
            <View key={n} style={styles.gridLine}>
              <Text style={styles.gridText}>{n}</Text>
            </View>
          ))}

          <View style={styles.overlayDots}>
            {trend.map((val, i) => (
              <View key={i} style={styles.pointWrapper}>
                <View style={[styles.dot, { bottom: `${val}%` }]} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.xAxis}>
          {dates.map((d) => (
            <Text key={d} style={styles.axisText}>{d}</Text>
          ))}
        </View>
      </Card>

      {/* Download */}
      <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8} onPress={handleDownload}>
        <Download size={18} color="#FFFFFF" />
        <Text style={styles.downloadText}>Download Report</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 14 },

  /* Dropdown */
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dropdownText: { fontSize: 14, fontWeight: '600', color: '#1F2937' },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  menu: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  optionActive: { backgroundColor: '#E8F5E9' },
  optionText: { fontSize: 14, color: '#1F2937' },
  optionTextActive: { color: '#15803D', fontWeight: '700' },

  metricRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  metricLabel: { fontSize: 14, color: '#64748B' },
  metricValue: { fontSize: 15, fontWeight: 'bold', color: '#1F2937' },
  divider: { height: 1, backgroundColor: '#F1F5F9' },

  trendCard: { flex: 1 },
  chart: {
    flex: 1,
    minHeight: 100,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 5,
  },
  gridLine: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#E2E8F0', width: '100%' },
  gridText: { fontSize: 9, color: '#94A3B8', position: 'absolute', top: -6, left: 4 },
  overlayDots: {
    position: 'absolute',
    top: 0,
    left: 30,
    right: 20,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pointWrapper: { height: '100%', width: 10, position: 'relative' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#16A34A', position: 'absolute', left: 1 },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 15 },
  axisText: { fontSize: 11, color: '#94A3B8' },

  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'center',
    minWidth: 200,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#15803D',
  },
  downloadText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});
