# knowledgebase项目规范

## 版本管理

版本发布必须遵循[语义化版本2.0.0规范](http://semver.org/)，对于主版本号（MAJOR），次版本号（MINOR）和修订号（PATCH）须满足如下规则：

1. 主版本号更新：做了不兼容的 API 修改
2. 次版本号更新：做了向下兼容的功能性新增
3. 修订号更新：做了向下兼容的问题修正

## 项目文档及说明

内部开源项目须有基本文档，以便于其他人维护和贡献项目，文档内容包括但不限于下列内容：

### 必要

README.md

- 项目简介
- 安装（Installation）
- 接口文档：项目对外暴露可调用接口文档及说明，如有精力可搭建项目官网

CONTRIBUTING.md

- 贡献指南（Contribution Guide）：[具体说明](#贡献指南)
- 源码构建说明：Node js版本，npm脚本，测试脚本等说明
- 项目负责人列表

RELEASES.md

- 版本变更历史（Changelog）：可参考[vue js release notes](https://github.com/vuejs/vue/releases)

Milestones

- Milestones用于展示功能开发及bug修复迭代计划，每一个milestone对应一个迭代。
- 创建milestone时标题为迭代起始时间到结束时间，如2017.8.14 - 2017.8.25。
- Due Date选择迭代结束时间。
- Description非必填，可填写与当前迭代相关的附加说明。
- 创建好milestone将相应issue中添加到迭代中

### 根据项目具体情况可选

- 代码规范说明：指定Eslint和Stylelint要求，如有其他要求（如namespace，BEM等）需在文档中具体说明
- 浏览器兼容性说明，桌面端项目最小宽度支持说明等
- 最好有example目录
- 其他项目相关说明 (目录结构，安全要求等)
- 行为准则（Code of Conduct）：由于是内部项目这部分为optional，具体可参考[facebook行为准则](https://code.facebook.com/pages/876921332402685/open-source-code-of-conduct)
- License：由于是内部项目这部分可为optional

## Merge Request审核机制

### 推荐机制

每个项目确定两名或以上核心成员，所有的审核MR的决定权，以及评定 issue 的最终决策权仅由核心成员掌握。具体要求：

- 如果提交MR的是核心成员，则赞同票数为上述要求-1（如三名核心成员则只需另外一名成员approve）
- 核心成员个数**小于等于5个**时，需要**2个**或以上的赞同票数；核心成员个数**大于5个**时，需要**3个**或以上的赞同票数。

### 最低要求

如果项目情况特殊，可视情况只确定一名核心成员。核心成员提交MR可自己审核，核心成员外提交则由核心成员审核.

## 项目协作流程

- 确定一个迭代周期，暂推荐并尝试以一周为一个周期。
- **核心成员**每个周期固定进行一次会议，对上周期内的 issue 列表进行讨论决策，决定下周期的开发计划，其中包括 bug 修复优先级以及功能开发优先级，同步更新 repo 中的 bug to fix 以及功能计划清单文档。
- **核心成员**日常开发中可根据 issue 的紧急情况进行优先级调整，在开发周期内进行紧急修复。
- **普通用户及贡献者**日常使用发现 bug 或优化点直接在对应 repo 提交 issue，并选择合适的 label 进行标记。日常使用过程中可以根据 issue 列表以及 repo 中的功能计划清单贡献自己的代码，暂采用拉分支提 merge request 的方式。

## 贡献指南

正式开源项目贡献需fork项目，内部项目可简化这个步骤，直接新建分支并提交Merge Request。大部分项目merge代码到master分支，部分项目是merge到dev分支，需在贡献指南文档中具体说明。本项目以master为开发分支为例具体步骤如下：

1. 如提交内容没有在issue中需要首先创建issue [issue创建规范](#issue-report)
2. 新建分支：分支名为issue-[issue号] `git checkout -b issue-[ISSUE_NUMBER] -t origin/master`
3. Commit信息要规定首字母大小写（本项目首字母大写），要明确具体修复或者开发哪一个文件或模块，哪一个function或者变量等，commit最后括号里需加上issue号，如"Update version control information in README.md (#23)"。可参考[React Commits](https://github.com/facebook/react/commits/master)
4. Rebase：`git fetch origin master` `git rebase origin/master`
5. 编写并且跑通测试用例
6. 确认commit满足Eslint、Stylelint及项目代码规范
7. Push代码到远端分支：`git push origin issue-[ISSUE_NUMBER]`
8. 新建merge request，清晰说明修改内容和解决方案，可加tag来区分bug、feature等 [merge request流程](#merge-request)
9. 等待项目负责人review，如果需要修改需在修改后重新rebase并push到远端分支
10. Review通过，代码合并

### 注意

- **不要提交打包后文件**
- 每个merge request对应一个逻辑点，如一个issue ticket，merge时commit需最终squash成**一个commit**

## Issue Report

### Title

填写issue概要信息

### Assign to

**issue未开始实现时为Unassigned状态，开始实现时改为具体实现开发人员**

### Labels

项目固定预设bug（红色）、feature（绿色）和enhancement（蓝色）三个label，效果如下图，根据具体情况可额外新建label

![labels](labels.png)

### Description

Description根据不同label填写不同内容，具体要求如下：

**bug**

```md
## 版本
## 重现步骤
## 期望结果
## 实际结果
## 附加说明（非必写）
```

**feature**

```md
## 解决了什么问题
## 建议最终实现效果（如可能需提供API等信息）
## 附加说明（非必写）
```

**enhancement**

```md
## 版本
## 当前状态及问题
## 建议最终实现效果（如可能需提供API等信息）
## 附加说明（非必写）
```

## Merge Request

### 创建者

1. 在Merge Request栏中点击New Merge Request按钮
2. Source branch选择自己分支（issue-[ISSUE_NUMBER]），Target branch选择项目主开发分支
3. 如果有一个commit，MR title会自动填充为commit信息，如果有多个commit，在title中需填写第一个commit信息
4. Description中要写明commit具体内容，solution等，如有demo或截图需添加对应链接。Description最后要`@review开发人员`，这样所有项目成员都可以看到这条MR并进行review
5. Assign to选择自己

### 核心成员

- 核心成员看到新Merge Request后进入MR点击右边的Add reviewer按钮并添加所有核心成员，如果MR提交者是核心成员，则reviewer中无需添加自己
- 如果对commit有疑问或需要改动可直接留言，没有问题则点击Review Changes - Approve，信息建议填写approved
- approve人数符合[Merge Request审核机制](#merge-request审核机制)则可合并MR
- merge时**不要点击“Accept Merge Request”按钮**，这样会生成多余commit信息。核心成员将待merge分支squash成为一个commit，force push到远端MR分支并最终merge回master分支，具体命令如下：
  1. git fetch origin
  2. git checkout issue-[ISSUE_NUMBER]
  3. git rebase -i master 在Editor界面中第一个commit为pick，其余全部为fixup或f
  4. git push -f origin issue-[ISSUE_NUMBER]
  5. git checkout master
  6. git merge issue-[ISSUE_NUMBER]
  7. git push origin master
- merge完成后在MR页面**点击“Remove Source Branch”按钮**
- 确认上述步骤完成后**将issue状态改为closed**
