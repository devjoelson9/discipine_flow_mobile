import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AlertCircle } from 'lucide-react-native';

import { HeaderSection } from '@/components/dashboard/HeaderSection';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { TimerWidget } from '@/components/dashboard/TimerWidget';
import { WeeklySummary } from '@/components/dashboard/WeeklySummary';
import { StudyChart } from '@/components/dashboard/StudyChart';
import { TaskChart } from '@/components/dashboard/TaskChart';
import { HeatmapSection } from '@/components/dashboard/HeatmapSection';
import { BadgesSection } from '@/components/dashboard/BadgesSection';
import { UpcomingStudies } from '@/components/dashboard/UpcomingStudies';
import { NextExamCard } from '@/components/dashboard/NextExamCard';
import { FocusedDisciplines } from '@/components/dashboard/FocusedDisciplines';
import { ReviewsToday } from '@/components/dashboard/ReviewsToday';
import { OnboardingModal } from '@/components/dashboard/OnboardingModal';
import { useDashboard } from '@/components/dashboard/useDashboard';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const DashboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { data, loading, error, refresh, isRefreshing } = useDashboard(true);
  const [showOnboarding, setShowOnboarding] = useState(data?.showOnboarding ?? false);

  const fadeAnim = useSharedValue(0);

  const handleRefresh = useCallback(async () => {
    await refresh();
  }, [refresh]);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  if (loading && !data) {
    return (
      <View className="flex-1 bg-slate-50 justify-center items-center">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="text-slate-600 mt-3">Loading your dashboard...</Text>
      </View>
    );
  }

  if (error && !data) {
    return (
      <View
        className="flex-1 bg-slate-50 justify-center items-center px-4"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <AlertCircle size={48} color="#ef4444" />
        <Text className="text-lg font-semibold text-slate-800 mt-4 text-center">
          Unable to load dashboard
        </Text>
        <Text className="text-sm text-slate-600 mt-2 text-center">
          {error.message}
        </Text>
        <Pressable
          onPress={handleRefresh}
          className="mt-6 bg-indigo-600 rounded-xl px-6 py-3"
        >
          <Text className="text-white font-semibold">Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 bg-slate-50 justify-center items-center">
        <Text className="text-slate-600">No data available</Text>
      </View>
    );
  }

  return (
<<<<<<< HEAD
    <>
      <OnboardingModal
        visible={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
        userCanAccessAll={data.userCanAccessAdvancedStats}
      />

      <AnimatedScrollView
        className="flex-1 bg-slate-50"
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 16,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#6366f1"
            colors={['#6366f1']}
          />
        }
        scrollEventThrottle={16}
      >
        {error && data && (
          <AnimatedView className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex-row items-center gap-3">
            <AlertCircle size={20} color="#ef4444" />
            <Text className="text-sm text-red-800 flex-1">
              Error refreshing data. Showing cached data.
            </Text>
          </AnimatedView>
        )}

        <Animated.View entering={FadeInDown.delay(100)}>
          <HeaderSection
            estudosHoje={data.stats.estudos_hoje}
            weekStart={data.weekStart}
            weekEnd={data.weekEnd}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)}>
          <StatsCards stats={data.stats} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300)}>
          <TimerWidget
            dailyMinutes={data.studyTotals.day_minutes}
            dailyGoal={data.studyGoals.daily_goal}
            dailyProgress={data.studyGoals.daily_progress}
            weeklyMinutes={data.studyTotals.week_minutes}
            weeklyGoal={data.studyGoals.weekly_goal}
            weeklyProgress={data.studyGoals.weekly_progress}
            timerRunning={data.timerState.running}
            timerEnabled={data.userTimerWidgetEnabled}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)}>
          <WeeklySummary weeklyResume={data.weeklyResume} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500)}>
          <StudyChart
            labels={data.chartWeekData.labels}
            values={data.chartWeekData.values}
          />
          <TaskChart
            labels={data.chartTaskData.labels}
            values={data.chartTaskData.values}
          />
        </Animated.View>

        {data.userCanAccessAdvancedStats && data.heatmap && data.streaks && (
          <>
            <Animated.View entering={FadeInDown.delay(600)}>
              <HeatmapSection heatmap={data.heatmap} streaks={data.streaks} />
            </Animated.View>

            {data.badges && (
              <Animated.View entering={FadeInDown.delay(700)}>
                <BadgesSection badges={data.badges} />
              </Animated.View>
            )}
          </>
        )}

        <Animated.View entering={FadeInDown.delay(800)}>
          <ReviewsToday reviews={data.revisoesDHoje} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900)}>
          <View className="mb-6">
            <Text className="text-lg font-bold text-slate-800 mb-4">
              Upcoming Studies
            </Text>
            <UpcomingStudies estudos={data.proximosEstudos} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(1000)} className="gap-4 mb-6">
          <NextExamCard prova={data.proximaProva} />
          <View>
            <Text className="text-lg font-bold text-slate-800 mb-4">
              Focus This Week
            </Text>
            <FocusedDisciplines disciplinas={data.disciplinasEmFoco} />
          </View>
        </Animated.View>

        {!data.userCanAccessAdvancedStats && (
          <Animated.View entering={FadeInDown.delay(1100)} className="mb-4">
            <View className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <Text className="text-sm font-semibold text-indigo-700">
                🚀 Premium Features
              </Text>
              <Text className="text-xs text-indigo-600 mt-1">
                Upgrade to unlock heatmap, badges, and advanced analytics!
              </Text>
            </View>
          </Animated.View>
        )}
      </AnimatedScrollView>
    </>
  );
};

export default DashboardScreen;
=======
    <View
      className="flex-1 bg-slate-50"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}
      >
        {showOnboarding && (
          <OnboardingModal onComplete={handleCompleteOnboarding} />
        )}

        <HeaderSection />

        {stats && <StatsCards stats={stats} />}

        {studyTotals && studyGoals && (
          <TimerSection
            studyTotals={studyTotals}
            studyGoals={studyGoals}
            timerState={timerState}
            userShowsTimerWidget={user?.show_timer_widget ?? true}
          />
        )}

        {weeklyResume && <WeeklySummarySection weeklyResume={weeklyResume} />}
      </ScrollView>
    </View>
  );
}
>>>>>>> 6295c22 (feat: adiciona dashboard)
