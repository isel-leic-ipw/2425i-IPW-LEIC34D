import assert from 'node:assert/strict';

import tasksDataInit from '../data/memory/tasks-data-mem.mjs';
import usersDataInit from '../data/memory/users-data-mem.mjs';
import usersServicesInit from '../services/users-services.mjs';
import tasksServicesInit from '../services/tasks-services.mjs';

// Init the necessary modules
const tasksData = tasksDataInit();
const usersData = usersDataInit();
const usersServices = usersServicesInit(usersData);
const tasksServices = tasksServicesInit(tasksData, usersServices);

describe('Tasks services', function () {
  describe('#get all tasks for an user', function () {
    // This token corresponds to user 1
    const tokenUser1 = "b0506867-77c3-4142-9437-1f627deebd67";
    const tokenUser2 = "f1d1cdbc-97f0-41c4-b206-051250684b19";

    it('should return all tasks for user 1', async function () {
        // Token of user 1
        let tasks = await tasksServices.getAllTasks(tokenUser1);
        // User 1
        let expectedAllTasks = await tasksData.getAllTasks(1);
        // asserts
        assert.deepEqual(tasks, expectedAllTasks);
    });
    it('should return all tasks for user 2', async function () {
      // Token of user 2
      let tasks = await tasksServices.getAllTasks(tokenUser2);
      // User 2
      let expectedAllTasks = await tasksData.getAllTasks(2);
      // asserts
      assert.deepEqual(tasks, expectedAllTasks);
    });
    // TODO: make unit tests for other functions and cases of error.
  });
});