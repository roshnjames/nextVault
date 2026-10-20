import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';

import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

import PopupComponent from '../../components/PopupComponent';
import useHomeScreenViewModel from '../../viewmodels/homeScreen/useHomeScreenViewModel';

const CARD_WIDTH = '84%';
const NEIGHBOR_OFFSET = 0.88;

const HomeScreen = () => {
    const homeScreenModel = useHomeScreenViewModel();

    const {
        width: screenWidth,
        height: screenHeight,
    } = useWindowDimensions();

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const translateX = useSharedValue(0);

    const filteredTasks = homeScreenModel.filteredTasks ?? [];
    const taskCount = filteredTasks.length;

    const taskIdsKey = filteredTasks
        .map(task => task.task_id)
        .join('|');

    useEffect(() => {
        setCurrentCardIndex(0);
        translateX.value = 0;
    }, [
        homeScreenModel.selectedDate,
        homeScreenModel.pendingTasks,
        taskIdsKey,
        translateX,
    ]);

    const activeIndex =
        taskCount > 0
            ? Math.min(currentCardIndex, taskCount - 1)
            : 0;

    const previousIndex = activeIndex - 1;
    const nextIndex = activeIndex + 1;

    const currentTask = filteredTasks[activeIndex];

    const previousTask =
        previousIndex >= 0
            ? filteredTasks[previousIndex]
            : null;

    const nextTask =
        nextIndex < taskCount
            ? filteredTasks[nextIndex]
            : null;

    useFocusEffect(
        useCallback(() => {
            homeScreenModel.setHeader(
                homeScreenModel.homeScreenTexts.YOUR_TASKS
            );
        }, [])
    );

    const changeCard = useCallback(
        direction => {
            setCurrentCardIndex(index => {
                const count = filteredTasks.length;

                if (count === 0) {
                    return 0;
                }

                if (direction === 'left') {
                    return Math.min(index + 1, count - 1);
                }

                return Math.max(index - 1, 0);
            });

            translateX.value = 0;
        },
        [filteredTasks.length, translateX]
    );

    const swipeGesture = Gesture.Pan()
        .activeOffsetX([-10, 10])
        .failOffsetY([-15, 15])
        .onUpdate(event => {
            translateX.value = event.translationX;
        })
        .onEnd(event => {
            const swipeThreshold = 100;

            if (
                event.translationX < -swipeThreshold &&
                activeIndex < taskCount - 1
            ) {
                translateX.value = withTiming(
                    -screenWidth,
                    { duration: 250 },
                    finished => {
                        if (finished) {
                            runOnJS(changeCard)('left');
                        }
                    }
                );
            } else if (
                event.translationX > swipeThreshold &&
                activeIndex > 0
            ) {
                translateX.value = withTiming(
                    screenWidth,
                    { duration: 250 },
                    finished => {
                        if (finished) {
                            runOnJS(changeCard)('right');
                        }
                    }
                );
            } else {
                translateX.value = withSpring(0);
            }
        });

    const animatedCardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    const previousCardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX:
                    -screenWidth * NEIGHBOR_OFFSET +
                    translateX.value * NEIGHBOR_OFFSET,
            },
        ],
    }));

    const nextCardStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX:
                    screenWidth * NEIGHBOR_OFFSET +
                    translateX.value * NEIGHBOR_OFFSET,
            },
        ],
    }));

    const addTaskButton = () => (
        <View style={homeScreenModel.styles.noTaskContainer}>
            <TouchableOpacity
                style={homeScreenModel.styles.taskAddButton}
                onPress={homeScreenModel.handleAddTask}
            >
                <Image
                    source={
                        homeScreenModel.scheduleScreenButtons.ADD_TASK
                    }
                    style={homeScreenModel.styles.addtaskItemImage}
                />

                <Text style={homeScreenModel.styles.addTaskText}>
                    {homeScreenModel.scheduleScreenTexts.ADD_TASK}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const renderTaskCard = (task, index, isActive = false) => {
        if (!task) {
            return null;
        }

        return (
            <View
                style={[
                    homeScreenModel.styles.taskItemContainer,
                    {
                        width: CARD_WIDTH,
                        alignSelf: 'center',
                        ...(isActive && {
                            height: screenHeight * 0.66,
                        }),
                        borderColor:homeScreenModel.handleTaskColor(
                                task.task_priority,
                                task.task_is_completed
                            ),
                    },
                ]}
            >
                <View
                    style={homeScreenModel.styles.taskItemContent}
                >
                    <View
                        style={
                            homeScreenModel.styles.taskItemNameContainer
                        }
                    >
                        <View
                            style={
                                homeScreenModel.styles
                                    .taskItemIndexContainer
                            }
                        >
                            <Text
                                style={
                                    homeScreenModel.styles
                                        .taskItemIndexText
                                }
                            >
                                {index + 1}
                            </Text>
                        </View>

                        <View
                            style={
                                homeScreenModel.styles
                                    .taskItemNameMainContainer
                            }
                        >
                            <Text
                                style={
                                    homeScreenModel.styles
                                        .taskItemNameText
                                }
                            >
                                {task.task_name}
                            </Text>
                        </View>

                        <View
                            style={
                                homeScreenModel.styles
                                    .taskItemAlarmContainer
                            }
                        >
                            <Image
                                source={
                                    task.task_alert === 1
                                        ? homeScreenModel
                                              .scheduleScreenButtons
                                              .ALARM_ON
                                        : homeScreenModel
                                              .scheduleScreenButtons
                                              .ALARM_OFF
                                }
                                style={
                                    homeScreenModel.styles
                                        .taskItemAlarmImage
                                }
                            />
                        </View>
                    </View>

                    <View
                        style={
                            homeScreenModel.styles
                                .taskItemDetailsContainer
                        }
                    >
                        <View
                            style={[
                                homeScreenModel.styles
                                    .taskItemDetailsMainContainer,
                                task.task_image == null && {
                                    height: '100%',
                                },
                            ]}
                        >
                            <Text
                                style={
                                    homeScreenModel.styles
                                        .taskItemDetailsText
                                }
                            >
                                {task.task_details}
                            </Text>
                        </View>

                        {task.task_image && (
                            <Image
                                source={{
                                    uri: `file://${task.task_image}`,
                                }}
                                style={
                                    homeScreenModel.styles.taskItemImage
                                }
                            />
                        )}
                    </View>
                </View>

                <View
                    style={
                        homeScreenModel.styles
                            .taskItemButtonsContainer
                    }
                >
                    <TouchableOpacity
                        style={
                            homeScreenModel.styles.taskItemButton
                        }
                        onPress={() =>
                            homeScreenModel.handleDeleteTask(
                                task.task_id
                            )
                        }
                    >
                        <Image
                            source={
                                homeScreenModel.scheduleScreenButtons
                                    .DELETE_TASK
                            }
                            style={
                                homeScreenModel.styles
                                    .taskItemButtonImage
                            }
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={
                            homeScreenModel.styles.taskItemButton
                        }
                        onPress={() =>
                            homeScreenModel.handleEditTask(
                                task.task_id
                            )
                        }
                    >
                        <Image
                            source={
                                homeScreenModel.scheduleScreenButtons
                                    .EDIT_TASK
                            }
                            style={
                                homeScreenModel.styles
                                    .taskItemButtonImage
                            }
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={
                            homeScreenModel.styles.taskItemButton
                        }
                        onPress={() =>
                            homeScreenModel.handleTaskCompletion(
                                task.task_id
                            )
                        }
                    >
                        <Image
                            source={
                                homeScreenModel.scheduleScreenButtons
                                    .DONE_TASK
                            }
                            style={
                                homeScreenModel.styles
                                    .taskItemButtonImage
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderBackgroundCard = (
        task,
        index,
        animatedStyle,
        cardPosition
    ) => {
        if (!task) {
            return null;
        }

        return (
            <Animated.View
                key={`${cardPosition}-${task.task_id}`}
                pointerEvents="none"
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 0,
                    },
                    animatedStyle,
                ]}
            >
                {renderTaskCard(task, index, false)}
            </Animated.View>
        );
    };

    return (
        <View style={homeScreenModel.styles.majorContainer}>
            <View
                style={[
                    homeScreenModel.styles.mainContainer,
                    {
                        flex: 1,
                    },
                ]}
            >
                <View
                    style={homeScreenModel.styles.filterContainer}
                >
                    {homeScreenModel.pendingTasks && (
                        <View
                            style={[
                                homeScreenModel.styles
                                    .filterButtonContainer,
                                {
                                    flex: 0.4,
                                    backgroundColor:
                                        'rgb(230, 112, 94)',
                                },
                            ]}
                        >
                            <TouchableOpacity
                                style={
                                    homeScreenModel.styles.filterButton
                                }
                                onPress={() =>
                                    homeScreenModel
                                        .handlePendingTasksPress()
                                }
                            >
                                <Text
                                    style={
                                        homeScreenModel.styles
                                            .filterDateText
                                    }
                                >
                                    {
                                        homeScreenModel.homeScreenTexts
                                            .PENDING_TASKS
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text
                        style={homeScreenModel.styles.filterText}
                    >
                        {homeScreenModel.homeScreenTexts.SELECT_DATE}
                    </Text>

                    <View
                        style={
                            homeScreenModel.styles
                                .filterButtonContainer
                        }
                    >
                        <TouchableOpacity
                            style={
                                homeScreenModel.styles.filterButton
                            }
                            onPress={() =>
                                homeScreenModel.setShowDatePicker(true)
                            }
                        >
                            <Text
                                style={
                                    homeScreenModel.styles.filterDateText
                                }
                            >
                                {homeScreenModel.selectedDate}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {taskCount === 0 && addTaskButton()}

                {taskCount > 0 && (
                    <View
                        style={[
                            homeScreenModel.styles.tasksContainer,
                            {
                                flex: 1,
                                position: 'relative',
                                overflow: 'hidden',
                            },
                        ]}
                    >
                        {currentTask && (
                            <View
                                style={{
                                    flex: 1,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {previousTask &&
                                    renderBackgroundCard(
                                        previousTask,
                                        previousIndex,
                                        previousCardStyle,
                                        'previous'
                                    )}

                                {nextTask &&
                                    renderBackgroundCard(
                                        nextTask,
                                        nextIndex,
                                        nextCardStyle,
                                        'next'
                                    )}

                                <GestureDetector
                                    gesture={swipeGesture}
                                >
                                    <Animated.View
                                        style={[
                                            {
                                                position: 'absolute',
                                                top: 0,
                                                bottom: 0,
                                                left: 0,
                                                right: 0,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 1,
                                            },
                                            animatedCardStyle,
                                        ]}
                                    >
                                        {renderTaskCard(
                                            currentTask,
                                            activeIndex,
                                            true
                                        )}
                                    </Animated.View>
                                </GestureDetector>
                            </View>
                        )}
                    </View>
                )}

                {homeScreenModel.showDatePicker && (
                    <DateTimePicker
                        value={
                            new Date(homeScreenModel.selectedDate)
                        }
                        mode="date"
                        display="spinner"
                        onValueChange={
                            homeScreenModel.handleDateSelection
                        }
                        onDismiss={() =>
                            homeScreenModel.setShowDatePicker(false)
                        }
                    />
                )}
            </View>

            {homeScreenModel.popupVisible && (
                <PopupComponent
                    visible={homeScreenModel.popupVisible}
                    popupText={homeScreenModel.popupText}
                    setClosePopup={
                        homeScreenModel.setPopupVisible
                    }
                />
            )}
        </View>
    );
};

export default HomeScreen;
