package com.sunseagear.common.datarule.handler;

import com.sunseagear.common.datarule.model.DataRuleModel;
import com.sunseagear.common.datarule.model.RoleDataRuleModel;
import com.sunseagear.common.datarule.model.TreeEntityModel;
import com.sunseagear.common.datarule.model.UserModel;
import com.sunseagear.common.utils.MapBeanUtil;
import com.sunseagear.common.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class DataRuleHandler {


    HashMap<String, List<String>> roleDataRuleModelHashMap = new HashMap<>();
    HashMap<String, DataRuleModel> dataRuleModelHashMap = new HashMap<>();
    HashMap<String, Map<String, Object>> userModelHashMap = new HashMap<>();
    HashMap<String, List<TreeEntityModel>> treeEntityModelMap = new HashMap<>();

    private final JdbcTemplate jdbcTemplate;

    public void init() {
        List<DataRuleModel> list = jdbcTemplate.query("select * from sys_data_rule where del_flag = ?", new Object[]{0}, new BeanPropertyRowMapper<>(DataRuleModel.class));
        list.forEach(item -> {
            dataRuleModelHashMap.put(item.getScopeClass(), item);
            if (StringUtils.isEmpty(item.getTableName())) {
                return;
            }
            List<TreeEntityModel> treeEntityModelList = jdbcTemplate.query(String.format("select * from %s where del_flag = ?", item.getTableName()), new Object[]{0}, new BeanPropertyRowMapper<>(TreeEntityModel.class));
            treeEntityModelMap.put(item.getTableName(), treeEntityModelList);
        });

        refreshRole();
    }

    public DataRuleModel getDataRuleModel(String mapperId) {
        if (dataRuleModelHashMap.containsKey(mapperId)) {
            return dataRuleModelHashMap.get(mapperId);
        }
        return null;
    }

    public List<String> getChildren(String tableName, String id) {
        if (!treeEntityModelMap.containsKey(tableName)) {
            List<TreeEntityModel> treeEntityModelList = jdbcTemplate.query(String.format("select * from %s where del_flag = ?", tableName), new Object[]{0}, new BeanPropertyRowMapper<>(TreeEntityModel.class));
            treeEntityModelMap.put(tableName, treeEntityModelList);
        }
        List<String> idList = new ArrayList<>();
        List<TreeEntityModel> treeEntityModelList = treeEntityModelMap.get(tableName);
        treeEntityModelList.forEach(item -> {
            if (item.getId().equals(id) || (!StringUtils.isEmpty(item.getParentIds()) && item.getParentIds().contains(id + "/"))) {
                idList.add(item.getId());
            }
        });
        return idList;
    }


    public void refreshTreeEntity(String tableName) {
        List<TreeEntityModel> treeEntityModelList = jdbcTemplate.query(String.format("select * from %s where del_flag = ?", tableName), new Object[]{0}, new BeanPropertyRowMapper<>(TreeEntityModel.class));
        treeEntityModelMap.put(tableName, treeEntityModelList);
    }

    public void refreshRole() {
        List<RoleDataRuleModel> roleDataRuleModelList = jdbcTemplate.query("select * from sys_role_data_rule", new Object[]{}, new BeanPropertyRowMapper<>(RoleDataRuleModel.class));
        roleDataRuleModelHashMap.clear();
        roleDataRuleModelList.forEach(item -> {
            if (!roleDataRuleModelHashMap.containsKey(item.getRoleId())) {
                roleDataRuleModelHashMap.put(item.getRoleId(), new ArrayList<>());
            }
            roleDataRuleModelHashMap.get(item.getRoleId()).add(item.getDataRuleId());
        });
    }

    public void refreshDataRule(String id) {
        DataRuleModel dataRuleModel = jdbcTemplate.queryForObject("select * from sys_data_rule where id = ?", new Object[]{id}, new BeanPropertyRowMapper<>(DataRuleModel.class));
        for (Map.Entry<String, DataRuleModel> entry : dataRuleModelHashMap.entrySet()) {
            if (entry.getValue().getId().equals(id)) {
                dataRuleModelHashMap.remove(entry.getKey());
                break;
            }
        }
        dataRuleModelHashMap.put(dataRuleModel.getScopeClass(), dataRuleModel);
        if (StringUtils.isEmpty(dataRuleModel.getTableName())) {
            return;
        }
        List<TreeEntityModel> treeEntityModelList = jdbcTemplate.query(String.format("select * from %s where del_flag = ?", dataRuleModel.getTableName()), new Object[]{0}, new BeanPropertyRowMapper<>(TreeEntityModel.class));
        treeEntityModelMap.put(dataRuleModel.getTableName(), treeEntityModelList);

    }

    public void deleteDataRule(String id) {
        for (Map.Entry<String, DataRuleModel> entry : dataRuleModelHashMap.entrySet()) {
            if (entry.getValue().getId().equals(id)) {
                dataRuleModelHashMap.remove(entry.getKey());
                break;
            }
        }
    }

    public DataRuleModel getDataRule(String mapperId, String roleId) {
        DataRuleModel dataRuleModel = getDataRuleModel(mapperId);
        if (dataRuleModel == null) {
            return null;
        }
        if (!roleDataRuleModelHashMap.containsKey(roleId)) {
            //????????????????????????????????????
            refreshRole();
            //??????????????????????????????null
            if (!roleDataRuleModelHashMap.containsKey(roleId)) {
                return null;
            }
        }
        boolean isMatch = roleDataRuleModelHashMap.get(roleId).stream().anyMatch(dataRuleModel.getId()::contains);
        if (isMatch) {
            return dataRuleModel;
        }
        return null;

    }

    public void refreshUser(String id) {
        UserModel userModel = jdbcTemplate.queryForObject("select * from sys_user where id = ?", new Object[]{id}, new BeanPropertyRowMapper<>(UserModel.class));
        try {
            Map<String, Object> map = MapBeanUtil.convertBean(userModel);
            userModelHashMap.put(id, map);
        } catch (IntrospectionException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }

    public Map<String, Object> getUser(String id) {
        if (!userModelHashMap.containsKey(id)) {
            refreshUser(id);
        }
        if (userModelHashMap.containsKey(id)) {
            return userModelHashMap.get(id);
        }
        return null;
    }
}
