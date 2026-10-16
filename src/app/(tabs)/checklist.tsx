import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, PillTabs, ScreenLayout } from '../../components/ScreenLayout';

const IMAGE = 'https://www.mypetchicken.com/cdn/shop/articles/baby_chick.jpg?v=1694122573';

const chicks = [
  { id: 'CHK-0234', days: '7 days', weight: '126 g', status: 'Healthy', score: '76%', image: IMAGE },
  { id: 'CHK-0231', days: '7 days', weight: '135 g', status: 'Healthy', score: '90%', image: IMAGE },
  { id: 'CHK-0233', days: '7 days', weight: '124 g', status: 'At Risk', score: '61%', image: IMAGE },
  { id: 'CHK-0235', days: '7 days', weight: '100 g', status: 'Sick', score: '42%', image: IMAGE },
  { id: 'CHK-0232', days: '7 days', weight: '110 g', status: 'Healthy', score: '92%', image: IMAGE },
];

const statuses = ['All', 'Healthy', 'At Risk', 'Sick'];

const badgeColors: Record<string, { bg: string; text: string }> = {
  Healthy: { bg: '#E8F5E9', text: '#2D6A4F' },
  'At Risk': { bg: '#FEF3C7', text: '#D97706' },
  Sick: { bg: '#FEE2E2', text: '#DC2626' },
};

export default function ChecklistScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filtered = chicks.filter(
    (c) =>
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedStatus === 'All' || c.status === selectedStatus)
  );

  return (
    <ScreenLayout title="Chick List" >
      {/* Search + filter pills */}
      <Card style={styles.filterCard}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search chick ID.."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <PillTabs options={statuses} value={selectedStatus} onChange={setSelectedStatus} />
      </Card>

      {/* Chick list */}
      {filtered.map((chick) => {
        const colors = badgeColors[chick.status];
        return (
          <TouchableOpacity
            key={chick.id}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: '/chick-profile' as any,
                params: {
                  id: chick.id,
                  days: chick.days,
                  weight: chick.weight,
                  status: chick.status,
                  score: chick.score,
                  image: chick.image,
                },
              })
            }
          >
            <Card style={styles.chickCard}>
              <Image source={{ uri: chick.image }} style={styles.chickImage} />

              <View style={styles.details}>
                <Text style={styles.chickId}>{chick.id}</Text>
                <Text style={styles.chickSub}>
                  {chick.days}   •   {chick.weight}
                </Text>
              </View>

              <View style={styles.right}>
                <View style={[styles.badge, { backgroundColor: colors.bg }]}>
                  <Text style={[styles.badgeText, { color: colors.text }]}>{chick.status}</Text>
                </View>
                <Text style={styles.score}>Health Score {chick.score}</Text>
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <Text style={styles.empty}>No chicks found</Text>
        </Card>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  filterCard: { gap: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 22,
    backgroundColor: '#F1F5F9',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#1F2937' },

  chickCard: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  chickImage: { width: 46, height: 46, borderRadius: 10, marginRight: 12, backgroundColor: '#F3F4F6' },
  details: { flex: 1 },
  chickId: { fontSize: 15, fontWeight: 'bold', color: '#1F2937' },
  chickSub: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  right: { alignItems: 'flex-end' },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, marginBottom: 4 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  score: { fontSize: 10, color: '#6B7280' },
  empty: { textAlign: 'center', color: '#6B7280' },
});
