import { assert } from "chai";
import { ListController } from "../../server/controllers/list.controller";
import { TaskController } from "../../server/controllers/task.controller";
import { UserController } from "../../server/controllers/user.controller";


// describe('ListsController()', () => {
//   const listsCtrl = new ListController();
//   it('create()', async () => {
//     assert.equal(null, await listsCtrl.create(null));
//   });
//   it('read()', async () => {
//     assert.equal(null, await listsCtrl.read(null));
//     assert.equal(null, await listsCtrl.read(null, null));
//   });
//   it('update()', async () => {
//     assert.equal(null, await listsCtrl.update(null, null));
//   });
//   it('delete()', async () => {
//     assert.equal(null, await listsCtrl.delete(null));
//   });
// });

// describe('TasksController()', () => {
//   const tasksCtrl = new TaskController();
//   it('create()', async () => {
//     assert.equal(null, await tasksCtrl.create(null));
//   });
//   it('read()', async () => {
//     assert.equal(null, await tasksCtrl.read(null));
//     assert.equal(null, await tasksCtrl.read(null, null));
//   });
//   it('update()', async () => {
//     assert.equal(null, await tasksCtrl.update(null, null));
//   });
//   it('delete()', async () => {
//     assert.equal(null, await tasksCtrl.delete(null));
//   });
// });

// describe('UsersController()', () => {
//   const usersCtrl = new UserController();
//   it('create()', async () => {
//     assert.equal(null, await usersCtrl.create(null));
//   });
//   it('read()', async () => {
//     assert.equal(null, await usersCtrl.read(null));
//     assert.equal(null, await usersCtrl.read(null, null));
//   });
//   it('update()', async () => {
//     assert.equal(null, await usersCtrl.update(null, null));
//   });
//   it('delete()', async () => {
//     assert.equal(null, await usersCtrl.delete(null));
//   });
// });
